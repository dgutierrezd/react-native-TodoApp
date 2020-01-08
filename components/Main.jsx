import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Note from "./Note";

export default function Main() {
  const [notesArray, setNotesArray] = useState([]);
  const [noteText, setNoteText] = useState("");

  let notes = notesArray.map((val, key) => {
    return (
      <Note
        key={key}
        keyval={key}
        val={val}
        deleteMethod={() => deleteNote(val.id)}
      ></Note>
    );
  });

  const addNote = () => {
    if (noteText) {
      var date = new Date();
      notesArray.push({
        'date': date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDay(),
        'note': noteText,
        'id': notesArray.length 
      });
      setNotesArray(notesArray);
      setNoteText('');
    }
  };

  const deleteNote = id => {
    let newNotes = notesArray.filter(note => note.id !== id);
    setNotesArray(newNotes);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>- TODO -</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {notes}
      </ScrollView>

      <KeyboardAvoidingView style={styles.footer} enabled behavior="padding">
        <TextInput
          style={styles.textInput}
          onChangeText={note => setNoteText(note)}
          value={noteText}
          placeholder="> Note"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
        ></TextInput>
        <TouchableOpacity onPress={addNote.bind(this)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#081c4a",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#ddd"
  },
  headerText: {
    color: "white",
    fontSize: 20,
    padding: 26
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 50
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 20,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed"
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 70,
    backgroundColor: "#081c4a",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24
  }
});
