const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US'; // Set language
  recognition.continuous = false; // Don't keep listening continuously
  recognition.interimResults = false; // Get final results, not interim

  // Event listener when recognition starts
  recognition.onstart = () => {
    console.log("Listening...");
  };

  // Event listener for when a result is received
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Result:", transcript); // Log the recognized text

    // You can add further logic here to handle commands based on the transcript
    handleVoiceCommand(transcript);
  };

  // Event listener when there's an error
  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
  };

  // Event listener for when recognition ends
  recognition.onend = () => {
    console.log("Recognition ended.");
  };

  // Start recognition
  recognition.start();

  // Function to handle commands received from the speech recognition
  const handleVoiceCommand = (command) => {
    console.log("Handling command:", command);

    // Example: Move piece logic (modify as per your game logic)
    const regex = /move (\w+) from (\w)(\d) to (\w)(\d)/;
    const matches = command.match(regex);

    if (matches) {
      const piece = matches[1];
      const fromX = 8 - parseInt(matches[3]);
      const fromY = matches[2].charCodeAt(0) - 97;
      const toX = 8 - parseInt(matches[5]);
      const toY = matches[4].charCodeAt(0) - 97;

      console.log(`Move command: ${piece} from ${matches[2]}${matches[3]} to ${matches[4]}${matches[5]}`);

      // You can add logic here to update the board, if required
    } else {
      console.log("Could not understand the command.");
    }
  };

} else {
  console.log("Speech recognition is not supported in this browser.");
}
