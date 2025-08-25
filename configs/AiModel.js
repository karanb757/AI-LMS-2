import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from '@google/generative-ai';

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };
  
  export const courseOutlineAIModel = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate a study material for Python for Exam and level of difficult will be EASY with summary of course, List of chapters along with summary of each chapter and Emoji icon for Each chapter, Topic list in each chapter. All result in JSON format.in the json data you give . can you please remove chapter_number ,replace title with chapter_title.`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `**Analyzing Python Exam Needs**
  
  I'm currently focused on defining the scope of study material for a beginner-level Python exam. My goal is to outline a comprehensive course summary, broken down into manageable chapters. Each chapter will include a brief summary, a corresponding emoji, and a list of key topics. This structure aims to provide a clear and engaging roadmap for learning.
  
  **Outlining Exam Structure**
  
  I've shifted from the general scope to the specific structure. I'm building a JSON-formatted course outline for a beginner-level Python exam. The focus is now on ensuring the JSON includes a course summary, chapters with titles, summaries, emojis, and topics. My strategy is to first draft the overarching summary, then populate each chapter with its necessary components, keeping the difficulty level appropriate for beginners.
          `,
          },
          {
            text: `\`\`\`json
  {
    "course_title": "Python Basics: Your First Steps into Programming",
    "course_summary": "This easy-level Python course is designed for absolute beginners with no prior programming experience. It covers the fundamental concepts of Python programming, including data types, variables, control flow, functions, and basic data structures. By the end of this course, you'll be able to write simple Python scripts and understand the core principles of programming.",
    "chapters": [
      {
        "chapter_title": "Introduction to Python",
        "chapter_summary": "This chapter introduces what Python is, why it's popular, and how to set up your development environment. You'll learn the very basics of running your first Python code.",
        "emoji_icon": "🐍",
        "topics": [
          "What is Python?",
          "Why learn Python?",
          "Installing Python (overview)",
          "Running your first Python program (Hello World)",
          "Comments in Python"
        ]
      },
      {
        "chapter_title": "Variables and Data Types",
        "chapter_summary": "Explore how Python handles different types of information. This chapter covers numbers, text (strings), and true/false values (booleans), and how to store them in variables.",
        "emoji_icon": "🔢",
        "topics": [
          "What are variables?",
          "Naming conventions for variables",
          "Common data types: Integers, Floats, Strings, Booleans",
          "Type conversion (e.g., int() , str() )"
        ]
      },
      {
        "chapter_title": "Basic Operations and Input/Output",
        "chapter_summary": "Learn to perform mathematical operations, manipulate strings, and interact with the user by taking input and displaying output.",
        "emoji_icon": "➕",
        "topics": [
          "Arithmetic operators (+, -, *, /, %, //, **)",
          "String concatenation and f-strings",
          "The print() function",
          "The input() function"
        ]
      },
      {
        "chapter_title": "Control Flow: Conditionals",
        "chapter_summary": "Understand how to make your programs make decisions using 'if', 'elif', and 'else' statements, allowing different code blocks to run based on conditions.",
        "emoji_icon": "🚦",
        "topics": [
          "Comparison operators (==, !=, <, >, <=, >=)",
          "Logical operators (and, or, not)",
          "if statement",
          "elif statement",
          "else statement",
          "Nested if statements (basic)"
        ]
      },
      {
        "chapter_title": "Control Flow: Loops",
        "chapter_summary": "Discover how to repeat actions in your programs using 'for' and 'while' loops, essential for automating repetitive tasks.",
        "emoji_icon": "🔄",
        "topics": [
          "What are loops?",
          "for loop (iterating over sequences)",
          "while loop (conditional repetition)",
          "break statement",
          "continue statement"
        ]
      },
      {
        "chapter_title": "Functions",
        "chapter_summary": "Learn to organize your code into reusable blocks called functions. This chapter covers defining your own functions, passing arguments, and returning values.",
        "emoji_icon": "⚙️",
        "topics": [
          "Why use functions?",
          "Defining a function (def keyword)",
          "Calling a function",
          "Parameters and Arguments",
          "Return values",
          "Docstrings for functions"
        ]
      },
      {
        "chapter_title": "Basic Data Structures: Lists and Tuples",
        "chapter_summary": "Get acquainted with two fundamental ways to store collections of items: lists (mutable) and tuples (immutable). You'll learn how to create, access, and modify them.",
        "emoji_icon": "📋",
        "topics": [
          "Introduction to data structures",
          "Lists: Creation, Accessing elements, Modifying elements, List methods (append, remove, len, etc.)",
          "Tuples: Creation, Accessing elements, Why use tuples (immutability)"
        ]
      },
      {
        "chapter_title": "Basic Data Structures: Dictionaries",
        "chapter_summary": "Explore dictionaries, which allow you to store data as key-value pairs, providing a flexible way to organize and retrieve information.",
        "emoji_icon": "📚",
        "topics": [
          "What are dictionaries?",
          "Creating dictionaries",
          "Accessing values by key",
          "Adding and modifying key-value pairs",
          "Dictionary methods (keys, values, items, get)"
        ]
      },
      {
        "chapter_title": "Error Handling (Basic Try-Except)",
        "chapter_summary": "Understand how to gracefully handle common errors that might occur during program execution using basic try-except blocks, making your code more robust.",
        "emoji_icon": "⚠️",
        "topics": [
          "Introduction to errors and exceptions",
          "The try-except block",
          "Common error types (e.g., ValueError, TypeError, ZeroDivisionError)",
          "Handling specific exceptions"
        ]
      }
    ]
  }
  \`\`\``,
          },
        ],
      },
    ],
  });
  

//GENERATE NOTES -> 
export const generateNotesAiModel = model.startChat({
  generationConfig: {
      ...generationConfig,
      responseMimeType: 'text/plain' // Changed from JSON to plain text for better HTML
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate exam material detail content for each chapter. 
Make sure to include all topic points in the content. 
Make sure to give all content in clean, well-formatted HTML format.
Do not include HTML, Head, Body, or Title tags.
Use proper HTML tags like <h2>, <h3>, <p>, <ul>, <li>, <code>, <pre>, <strong>, etc.
Ensure the content is properly structured and formatted for web display.
The chapters: {
  "chapter_title": "Control Flow: Conditionals",
  "chapter_summary": "Understand how to make your programs make decisions using 'if', 'elif', and 'else' statements, allowing different code blocks to run based on conditions.",
  "emoji_icon": "🚦",
  "topics": [
    "Comparison operators (==, !=, <, >, <=, >=)",
    "Logical operators (and, or, not)",
    "if statement",
    "elif statement",
    "else statement",
    "Nested if statements (basic)"
  ]
}`
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: `<h2>🚦 Control Flow: Conditionals</h2>
<p>Understand how to make your programs make decisions using 'if', 'elif', and 'else' statements, allowing different code blocks to run based on conditions.</p>

<h3>Comparison operators (==, !=, &lt;, &gt;, &lt;=, &gt;=)</h3>
<p>Comparison operators are used to compare two values and return a Boolean result (True or False). These are fundamental for creating conditions in control flow statements.</p>
<ul>
  <li><code>==</code> (Equal to): Checks if two values are equal.</li>
  <li><code>!=</code> (Not equal to): Checks if two values are not equal.</li>
  <li><code>&lt;</code> (Less than): Checks if the left operand is less than the right operand.</li>
  <li><code>&gt;</code> (Greater than): Checks if the left operand is greater than the right operand.</li>
  <li><code>&lt;=</code> (Less than or equal to): Checks if the left operand is less than or equal to the right operand.</li>
  <li><code>&gt;=</code> (Greater than or equal to): Checks if the left operand is greater than or equal to the right operand.</li>
</ul>
<p><strong>Example:</strong></p>
<pre><code>x = 10
y = 5
print(x == y)  # Output: False
print(x > y)   # Output: True</code></pre>

<h3>Logical operators (and, or, not)</h3>
<p>Logical operators combine conditional statements. They are crucial for building complex conditions by joining multiple simple conditions.</p>
<ul>
  <li><code>and</code>: Returns <code>True</code> if both conditions are true.</li>
  <li><code>or</code>: Returns <code>True</code> if at least one of the conditions is true.</li>
  <li><code>not</code>: Reverses the logical state of its operand. If a condition is true, <code>not</code> makes it false, and vice versa.</li>
</ul>
<p><strong>Example:</strong></p>
<pre><code>age = 25
is_student = True
print(age > 18 and is_student)  # Output: True (both conditions are true)
print(age < 20 or is_student)   # Output: True (is_student is true)
print(not is_student)          # Output: False</code></pre>

<h3>if statement</h3>
<p>The <code>if</code> statement is the most basic control flow statement. It executes a block of code only if a specified condition is true.</p>
<p><strong>Syntax:</strong></p>
<pre><code>if condition:
  # code to execute if condition is True</code></pre>
<p><strong>Example:</strong></p>
<pre><code>score = 85
if score >= 60:
  print("You passed the exam!")</code></pre>

<h3>elif statement</h3>
<p>The <code>elif</code> (else if) statement allows you to check multiple conditions sequentially. If the preceding <code>if</code> or <code>elif</code> conditions are false, the <code>elif</code> condition is evaluated.</p>
<p><strong>Syntax:</strong></p>
<pre><code>if condition1:
  # code for condition1
elif condition2:
  # code for condition2
elif condition3:
  # code for condition3</code></pre>
<p><strong>Example:</strong></p>
<pre><code>temperature = 28
if temperature < 0:
  print("Freezing cold!")
elif temperature < 15:
  print("A bit chilly.")
elif temperature < 25:
  print("Pleasant weather.")
else:
  print("Hot day!")</code></pre>

<h3>else statement</h3>
<p>The <code>else</code> statement provides a default block of code to execute if none of the preceding <code>if</code> or <code>elif</code> conditions are true. It is optional and can only be used once after an <code>if</code> or <code>elif</code> chain.</p>
<p><strong>Syntax:</strong></p>
<pre><code>if condition:
  # code if condition is True
else:
  # code if condition is False</code></pre>
<p><strong>Example:</strong></p>
<pre><code>age = 16
if age >= 18:
  print("You are an adult.")
else:
  print("You are a minor.")</code></pre>

<h3>Nested if statements (basic)</h3>
<p>Nested <code>if</code> statements involve placing one or more <code>if</code> (or <code>elif</code>/<code>else</code>) statements inside another <code>if</code> (or <code>elif</code>/<code>else</code>) block. This allows for more granular decision-making based on multiple levels of conditions.</p>
<p><strong>Syntax:</strong></p>
<pre><code>if outer_condition:
  # Code for outer_condition
  if inner_condition:
      # Code for inner_condition (executed only if outer_condition AND inner_condition are True)
  else:
      # Code if outer_condition is True but inner_condition is False</code></pre>
<p><strong>Example:</strong></p>
<pre><code>is_logged_in = True
has_admin_rights = False
if is_logged_in:
  print("Welcome, user!")
  if has_admin_rights:
      print("Accessing admin panel.")
  else:
      print("Accessing standard user dashboard.")
else:
  print("Please log in.")</code></pre>`
        }
      ]
    }
  ]
});


export const GenerateStudyTypeContentAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate flashcards on topic: Flutter Fundamentals, User Interface. Return only valid JSON array with front and back properties for each card."
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: `[{"front":"What is Flutter?","back":"Flutter is a UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. [2]"},{"front":"What language is Flutter primarily written in?","back":"Dart. [2, 3]"},{"front":"What are widgets in Flutter?","back":"Widgets are the fundamental building blocks of Flutter apps. Everything in Flutter is a widget. [2, 3]"},{"front":"What is the difference between StatelessWidget and StatefulWidget?","back":"StatelessWidgets don't change over time (e.g., an icon), while StatefulWidgets can change their appearance in response to events (e.g., a checkbox). [3]"},{"front":"How do you define the structure and layout of a Flutter app's UI?","back":"By composing widgets in a widget tree. [2]"},{"front":"What is a 'hot reload' in Flutter?","back":"A feature that injects updated source code into a running app, allowing developers to see changes instantly without restarting the app. [2]"},{"front":"What is MaterialApp in Flutter?","back":"A convenience widget that wraps a number of widgets that are commonly required for Material Design applications. [3]"},{"front":"What is a Scaffold widget used for?","back":"It provides a basic Material Design visual structure for the app, including app bars, drawers, snack bars, and bottom sheets. [3]"},{"front":"How do you display text in Flutter?","back":"Using the Text widget. [3]"},{"front":"How do you arrange widgets horizontally in Flutter?","back":"Using the Row widget. [3]"},{"front":"How do you arrange widgets vertically in Flutter?","back":"Using the Column widget. [3]"},{"front":"What is the primary way to navigate between screens (routes) in Flutter?","back":"Using the Navigator widget. [3]"},{"front":"How do you push a new screen onto the navigation stack?","back":"Navigator.push() method. [3]"},{"front":"How do you go back to the previous screen?","back":"Navigator.pop() method. [3]"},{"front":"What is a Route in Flutter navigation?","back":"An abstraction for a screen or page in an app. [3]"}]`
        }
      ]
    }
  ]
});

export const GenerateQuizAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Quiz on topic: Javascript chapters with quizTitle, Questions, and Options along with correct answer in JSON format (Max 10)"
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: `**Developing the JSON Structure**

I'm currently working on crafting the JSON structure for the quiz. I'm focusing on ensuring each quiz item includes the essential elements: \`quizTitle\`, \`question\`, an array of \`options\`, and the \`correctAnswer\`. I'm aiming for a concise and easily parseable format. My goal is a maximum of 10 items, representing different JavaScript concepts.

**Defining Quiz Content**

I've shifted gears to flesh out the content. My immediate task is to identify and select ten distinct JavaScript topics. After that, I'll formulate a relevant \`quizTitle\`, \`question\`, a set of \`options\`, and the \`correctAnswer\` for each topic. I'm focusing on creating accurate and clear questions. I'm leveraging my extensive JavaScript knowledge to generate this quiz content, rather than resorting to external searches.
`
        },
        {
          text: `\`\`\`json
[
  {
    "quizTitle": "JavaScript Basics",
    "question": "Which keyword is used to declare a variable in JavaScript?",
    "options": ["var", "let", "const", "All of the above"],
    "correctAnswer": "All of the above"
  },
  {
    "quizTitle": "Data Types",
    "question": "Which of the following is NOT a primitive data type in JavaScript?",
    "options": ["Number", "String", "Boolean", "Object"],
    "correctAnswer": "Object"
  },
  {
    "quizTitle": "Operators",
    "question": "What is the result of '5' + 3 in JavaScript?",
    "options": ["8", "53", "Error", "NaN"],
    "correctAnswer": "53"
  },
  {
    "quizTitle": "Control Flow",
    "question": "Which statement is used to execute a block of code if a specified condition is true?",
    "options": ["for", "while", "if", "switch"],
    "correctAnswer": "if"
  },
  {
    "quizTitle": "Functions",
    "question": "How do you call a function named 'myFunction'?",
    "options": ["call myFunction()", "myFunction[]", "myFunction()", "run myFunction()"],
    "correctAnswer": "myFunction()"
  },
  {
    "quizTitle": "Arrays",
    "question": "Which method is used to add an element to the end of an array?",
    "options": ["unshift()", "push()", "pop()", "shift()"],
    "correctAnswer": "push()"
  },
  {
    "quizTitle": "Objects",
    "question": "How do you access the property 'name' of an object named 'person'?",
    "options": ["person.name", "person['name']", "person->name", "Both A and B"],
    "correctAnswer": "Both A and B"
  },
  {
    "quizTitle": "Loops",
    "question": "Which type of loop executes a block of code at least once, and then repeats the loop as long as a condition is true?",
    "options": ["for loop", "while loop", "do...while loop", "for...in loop"],
    "correctAnswer": "do...while loop"
  },
  {
    "quizTitle": "ES6 Features",
    "question": "Which of the following is an ES6 feature for declaring block-scoped variables?",
    "options": ["var", "function", "let", "global"],
    "correctAnswer": "let"
  },
  {
    "quizTitle": "DOM Manipulation",
    "question": "Which method is used to select an HTML element by its ID?",
    "options": [
      "document.getElementsByClassName()",
      "document.querySelector()",
      "document.getElementById()",
      "document.getElementsByTagName()"
    ],
    "correctAnswer": "document.getElementById()"
  }
]
\`\`\``
        }
      ]
    }
  ]
});
