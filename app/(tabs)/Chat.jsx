import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const chatData = [
  {
    id: "1",
    name: "Sandra",
    lastMessage: "Hey.....How are you doing?",
    timestamp: "10:30 AM",
    unreadCount: 2,
    avatar:
      "data:image/jpeg;base64,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",
    isOnline: true,
  },
  {
    id: "2",
    name: "Mommy❤",
    lastMessage: "When you get back home, make egg sauce",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: "3",
    name: "Marilyne",
    lastMessage: "Thanks for your help🎉",
    timestamp: "Yesterday",
    unreadCount: 1,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: "4",
    name: "Alex ",
    lastMessage: "Did you see the new design?",
    timestamp: "12/15/23",
    unreadCount: 0,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
  },
  {
    id: "5",
    name: "Mr Ben",
    lastMessage: "I am fine and you",
    timestamp: "12/14/23",
    unreadCount: 0,
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: "6",
    name: "Abigial",
    lastMessage: "Have you gone home already",
    timestamp: "12/14/23",
    unreadCount: 0,
    avatar:
      "data:image/jpeg;base64,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",
    isOnline: true,
  },
];

// For contacts on the top row
const topContacts = [
  {
    id: "1",
    name: "You",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    isUser: true,
  },
  {
    id: "2",
    name: "Mom",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Dad",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Bro",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Sis",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  },
];

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState(chatData);
  const router = useRouter();

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.chatItem}
  >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        <View style={styles.chatFooter}>
          <Text
            style={[
              styles.lastMessage,
              item.unreadCount > 0 && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>

          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTopContact = ({ item }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.contactAvatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.contactAvatar} />
        {item.isUser && (
          <View style={styles.addStoryButton}>
            <Ionicons name="add" size={16} color="white" />
          </View>
        )}
      </View>
      <Text style={styles.contactName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Message</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="home-outline" size={24} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="create-outline" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar with Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={22} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* New Group and Archive Buttons */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction}>
          <Ionicons name="people" size={20} color="#007bff2" />
          <Text style={styles.quickActionText}>New group</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction}>
          <Ionicons name="archive" size={20} color="#007bff" />
          <Text style={styles.quickActionText}>Archive</Text>
        </TouchableOpacity>
      </View>

      {/* Top Contacts Row */}
      <View style={styles.contactsSection}>
        <FlatList
          data={topContacts}
          renderItem={renderTopContact}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contactsList}
        />
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Chats List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* New Chat Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="chatbubble" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    marginBottom: 10,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    margin: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  archivedButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
   quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
  },
  quickActionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#007bff",
  },
  contactsSection: {
    marginBottom: 15,
  },
  contactsList: {
    paddingHorizontal: 15,
  },
  contactItem: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 70,
  },
  contactAvatarContainer: {
    position: "relative",
    marginBottom: 6,
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  contactName: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  addStoryButton: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  listContent: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#007bff",
    borderWidth: 2,
    borderColor: "#fff",
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  unreadMessage: {
    color: "#1a1a1a",
    fontWeight: "500",
  },
  unreadBadge: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
