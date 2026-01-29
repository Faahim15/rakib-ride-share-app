import AttachOptionsModal from "@/src/components/passenger/tabs/chat/AttachOptionalModal";
import ChatHeader from "@/src/components/passenger/tabs/chat/ChatHeader";
import ImageViewerModal from "@/src/components/passenger/tabs/chat/ImageViewerModal";
import CustomStatusBar from "@/src/ui/CustomStatusBar";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ======================
   Types
====================== */

interface Attachment {
  uri: string;
  type: "image";
  filename: string;
}

interface Message {
  id: string;
  senderId: "me" | "support";
  text?: string;
  attachments?: Attachment[];
  createdAt: string;
}

/* ======================
   Fake Messages
====================== */

const FAKE_MESSAGES: Message[] = [
  {
    id: "1",
    senderId: "support",
    text: "Hello 👋 How can we help you today?",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    senderId: "me",
    text: "Hi, I'm facing an issue with my booking.",
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: "3",
    senderId: "support",
    text: "Please share details or a screenshot.",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "4",
    senderId: "me",
    attachments: [
      {
        uri: "https://picsum.photos/300/300",
        type: "image",
        filename: "issue.jpg",
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

/* ======================
   Screen
====================== */

const LiveChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachModal, setShowAttachModal] = useState(false);

  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  const flatListRef = useRef<FlatList<Message>>(null);

  /* ======================
     Load Fake Messages
  ====================== */

  useEffect(() => {
    setMessages(FAKE_MESSAGES);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  /* ======================
     Image Pickers
  ====================== */

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selected: Attachment[] = result.assets.map((asset) => ({
        uri: asset.uri,
        type: "image",
        filename: asset.fileName || `image_${Date.now()}.jpg`,
      }));

      setAttachments((prev) => [...prev, ...selected]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });

    if (!result.canceled) {
      const asset = result.assets[0];
      setAttachments((prev) => [
        ...prev,
        {
          uri: asset.uri,
          type: "image",
          filename: `camera_${Date.now()}.jpg`,
        },
      ]);
    }
  };

  /* ======================
     Send Message (Local)
  ====================== */

  const handleSendMessage = () => {
    if (!inputText.trim() && attachments.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text: inputText.trim() || undefined,
      attachments: attachments.length ? attachments : undefined,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setAttachments([]);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  /* ======================
     Image Viewer
  ====================== */

  const openImageViewer = (images: string[], index: number) => {
    setViewerImages(images);
    setViewerIndex(index);
    setImageViewerVisible(true);
  };

  /* ======================
     Render Message
  ====================== */

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === "me";

    return (
      <View
        className={`px-4 my-1.5 flex-row ${
          isMyMessage ? "justify-end" : "justify-start"
        }`}
      >
        <View
          className={`max-w-[70%] rounded-xl   px-3.5 py-2 ${
            isMyMessage
              ? "bg-brandColor rounded-tl-md "
              : "bg-[#E8E8E8] rounded-tr-md "
          }`}
        >
          {item.text && (
            <Text
              className={`text-sm font-poppins ${
                isMyMessage ? "text-white" : "text-gray-800"
              }`}
            >
              {item.text}
            </Text>
          )}

          {item.attachments && (
            <View className="flex-row flex-wrap gap-2 mt-2">
              {item.attachments.map((att, index) => {
                const images = item.attachments!.map((a) => a.uri);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openImageViewer(images, index)}
                  >
                    <Image
                      source={{ uri: att.uri }}
                      className="w-28 h-28 rounded-lg"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <Text
            className={`text-[10px] mt-1 self-end ${
              isMyMessage ? "text-white/70" : "text-gray-400"
            }`}
          >
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  /* ======================
     UI
  ====================== */

  return (
    <>
      <CustomStatusBar />

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <ChatHeader />

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <View className="px-4 py-2 flex-row flex-wrap bg-white">
            {attachments.map((file, index) => (
              <View key={index} className="mr-2 mb-2 relative">
                <Image
                  source={{ uri: file.uri }}
                  className="w-20 h-20 rounded-lg"
                />
                <TouchableOpacity
                  onPress={() =>
                    setAttachments((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
                >
                  <Ionicons name="close" size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Input */}
        <View className="bg-white border mx-[4%] border-t rounded-full border-[#f3f4f6]  ">
          <View className="px-4 py-3  flex-row items-center">
            <View className="flex-1 flex-row items-center bg-white rounded-full px-4">
              <TextInput
                className="flex-1 text-sm py-2 font-poppins text-gray-400 "
                placeholder="Type your message..."
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              {/* <TouchableOpacity onPress={() => setShowAttachModal(true)}>
                <Ionicons name="attach" size={20} color="#666" />
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              onPress={handleSendMessage}
              className="ml-2 w-11 h-11 rounded-full bg-brandColor justify-center items-center"
            >
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Modals */}
      <AttachOptionsModal
        visible={showAttachModal}
        onClose={() => setShowAttachModal(false)}
        onCamera={takePhoto}
        onGallery={pickImages}
      />

      <ImageViewerModal
        visible={imageViewerVisible}
        onClose={() => setImageViewerVisible(false)}
        images={viewerImages}
        currentIndex={viewerIndex}
      />
    </>
  );
};

export default LiveChatScreen;
