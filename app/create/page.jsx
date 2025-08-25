"use client";
import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "../../components/ui/button";
import TopicInput from "./_components/TopicInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const router = useRouter();

  // HANDLE USER INPUT 
  const handleUserInput = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
    
    // Clear validation error when user starts filling the field
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
    
    // Clear general error
    if (error) {
      setError("");
    }
    
    console.log("Updated formData:", { ...formData, [fieldName]: fieldValue });
  }

  // VALIDATION FUNCTIONS
  const validateStep0 = () => {
    if (!formData.courseType) {
      setValidationErrors({ courseType: "Please select a course type to continue" });
      return false;
    }
    return true;
  };

  const validateStep1 = () => {
    const errors = {};
    
    if (!formData.topic || formData.topic.trim().length === 0) {
      errors.topic = "Please enter a topic for your course";
    }
    
    if (!formData.difficultyLevel) {
      errors.difficultyLevel = "Please select a difficulty level";
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }
    
    return true;
  };

  // HANDLE NEXT STEP
  const handleNext = () => {
    if (step === 0) {
      if (validateStep0()) {
        setStep(step + 1);
        setValidationErrors({});
      }
    }
  };

  // USED TO SAVE USER INPUT AND GENERATE COURSE LAYOUT USING AI
  const GenerateCourseOutline = async () => {
    // Validate current step before proceeding
    if (!validateStep1()) {
      return;
    }

    const courseId = uuidv4();
    setLoading(true);
    setError("");

    try {
      console.log("formData before sending:", formData);
      
      // Double-check all required fields are present
      if (!formData.courseType || !formData.topic || !formData.difficultyLevel) {
        throw new Error("Missing required fields. Please fill out all options.");
      }

      const requestPayload = {
        courseId: courseId,
        topic: formData.topic.trim(),
        courseType: formData.courseType,
        difficultyLevel: formData.difficultyLevel,
        createdBy: user?.primaryEmailAddress?.emailAddress
      };

      console.log("Sending request with payload:", requestPayload);

      const result = await axios.post('/api/generate-course-outline', requestPayload);

      console.log('API Response:', result.data);

      if (result.data.success) {
        // Success - redirect to dashboard
        router.replace('/dashboard');
      } else {
        throw new Error(result.data.error || "Failed to generate course");
      }

    } catch (error) {
      console.error('Error generating course:', error);
      
      let errorMessage = "Failed to generate course. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 400) {
          errorMessage = "Invalid input. Please check all fields are filled correctly.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again in a moment.";
        } else {
          errorMessage = error.response.data?.error || errorMessage;
        }
      } else if (error.request) {
        // Network error
        errorMessage = "Network error. Please check your internet connection.";
      } else {
        // Other error
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:p-36 mt-20 min-h-screen">
      <h2 className="font-extrabold text-4xl text-primary mb-4">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-500 text-lg mb-8">
        Select an option to build your preferred course
      </p>

      {/* Error Display */}
      {error && (
        <div className="w-full max-w-2xl mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-800 mb-1">Error</h4>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-10 w-full max-w-4xl">
        {step === 0 ? (
          <div>
            <SelectOption selectedStudyType={(value) => handleUserInput('courseType', value)} />
            {validationErrors.courseType && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="text-yellow-800 text-sm">{validationErrors.courseType}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <TopicInput 
              setTopic={(value) => handleUserInput('topic', value)}
              setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
            />
            {/* Validation errors for step 1 */}
            {validationErrors.topic && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="text-yellow-800 text-sm">{validationErrors.topic}</p>
              </div>
            )}
            {validationErrors.difficultyLevel && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="text-yellow-800 text-sm">{validationErrors.difficultyLevel}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between w-full max-w-4xl mt-32">
        <div>
          {step !== 0 && (
            <Button 
              onClick={() => {
                setStep(step - 1);
                setValidationErrors({});
                setError("");
              }} 
              variant="outline"
              disabled={loading}
            >
              Previous
            </Button>
          )}
        </div>
        <div>
          {step === 0 ? (
            <Button 
              onClick={handleNext}
              className={`${!formData.courseType ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={GenerateCourseOutline} 
              disabled={loading || !formData.topic?.trim() || !formData.difficultyLevel}
              className={`${(!formData.topic?.trim() || !formData.difficultyLevel) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                'Generate Course'
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          step >= 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          1
        </div>
        <div className={`w-16 h-1 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          2
        </div>
      </div>
    </div>
  );
};

export default Create;