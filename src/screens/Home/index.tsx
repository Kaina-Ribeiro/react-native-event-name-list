import { useState } from "react";

import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./styles";
import { Participant } from "../../components/Participant";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);

  const [participantName, setParticipantName] = useState("");

  const handleParticipantAdd = (name: string) => {
    if (name === "") {
      Alert.alert(
        "Insira um nome para o participante",
        "O nome do participante não pode estar vazio!"
      );
      return;
    } else if (participants.includes(name)) {
      Alert.alert(
        "Participante Existe",
        "Já existe um participante na lista com esse nome!"
      );
      return;
    }

    setParticipants((prevState) => [...prevState, name]);
    setParticipantName("");
  };

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          );
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento </Text>
      <Text style={styles.eventDate}>Sexta, 4 de novembro de 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleParticipantAdd(participantName)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ao evento ainda? Adicione participantes a sua lista
            de presença!
          </Text>
        )}
      />
    </View>
  );
}
