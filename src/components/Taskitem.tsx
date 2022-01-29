import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ItemWrapper } from "./ItemWrapper";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import cancelEditIcon from "../assets/icons/edit/X.png";

import { Task } from "./TasksList";

interface ITaskItem {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleSubmitEditing: (id: number, value: string) => void;
  index: number;
  item: Task;
}

export const TaskItem = ({
  item,
  index,
  toggleTaskDone,
  removeTask,
  handleSubmitEditing,
}: ITaskItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);
  const [taskValue, setTaskValue] = useState(item.title);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleClickEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ItemWrapper index={index}>
      <View
        style={{
          paddingLeft: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 55,
          maxHeight: 55,
        }}
      >
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {!isEditing && (
            <Text style={item.done ? styles.taskTextDone : styles.taskText}>
              {item.title}
            </Text>
          )}
        </TouchableOpacity>
        {isEditing && (
          <TextInput
            onChangeText={setTaskValue}
            value={taskValue}
            ref={inputRef}
            onSubmitEditing={() => (
              handleSubmitEditing(item.id, taskValue), setIsEditing(false)
            )}
            editable={isEditing}
            style={[
              item.done ? styles.taskTextDone : styles.taskText,
              {
                padding: 0,
                maxWidth: 200,
                fontFamily: "Inter-Medium",
              },
            ]}
          />
        )}
      </View>
      <View style={styles.actionButtonsView}>
        <TouchableOpacity
          testID={`pen-${index}`}
          style={{
            justifyContent: "center",
            paddingRight: isEditing ? 18 : 12,
          }}
          onPress={handleClickEditing}
        >
          <Image source={isEditing ? cancelEditIcon : editIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{
            paddingLeft: 12,
            borderLeftColor: "rgba(196, 196, 196, 0.4)",
            borderLeftWidth: 1,
          }}
          onPress={() => removeTask(item.id)}
        >
          <Image style={isEditing && { opacity: 0.2 }} source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    maxHeight: 20,
    color: "#666",
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    maxHeight: 20,
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  actionButtonsView: {
    flexDirection: "row",
    paddingRight: 24,
  },
});
