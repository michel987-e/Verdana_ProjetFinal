import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
// import { sendMessageToBot } from "../services/chatbot";

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    //simulation des reponses chat
    setTimeout(() => {
      const botMessage = { text: `Bot: ${input}`, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);

    // Remplace la partie setTimeout par ça là:
    // const reply = await sendMessageToBot(input);
    // setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={item.sender === "user" ? styles.userText : styles.botText}>
            {item.text}
          </Text>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ecrivez votre message ici..."
        />
        <Button title="Envoyer" onPress={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginRight: 10 },
  userText: { textAlign: "right", backgroundColor: "#daf8e3", marginVertical: 5, padding: 10, borderRadius: 10 },
  botText: { textAlign: "left", backgroundColor: "#f1f1f1", marginVertical: 5, padding: 10, borderRadius: 10 }
});
