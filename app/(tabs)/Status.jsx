import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

function Status() {
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
  const viewedUpdates = [
    {
      id: "6",
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      time: "30 minutes ago",
      statusCount: 2,
      hasUnread: false,
    },
    {
      id: "7",
      name: "Sarah Miller",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      time: "1 hour ago",
      hasUnread: false,
    },
    {
      id: "8",
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      time: "3 hours ago",
      hasUnread: false,
    },
    {
      id: "9",
      name: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      time: "5 hours ago",
      hasUnread: false,
    },
    {
      id: "10",
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      time: "Yesterday",
      hasUnread: false,
    },
  ];

  //They describe how each item in the list should look
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

  //Viewed Items
  const renderViewedUpdate = ({ item }) => (
    <TouchableOpacity style={styles.viewedItem}>
      <View style={styles.viewedAvatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.viewedAvatar} />
      </View>

      <View style={styles.viewedInfo}>
        <Text style={styles.viewedName}>{item.name}</Text>
        <Text style={styles.viewedTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="grid-outline"
              size={24}
              color="#007bff"
              style={styles.headerIcon}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Status</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="camera"
              size={24}
              color="#007bff"
              style={styles.headerIcon}
            />
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View
            style={[
              styles.searchContainer,
              isFocused && { borderWidth: 1, borderColor: "#007bff" },
            ]}
          >
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search....."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
              onFocus={() => setIsFocused(true)} // when user taps
              onBlur={() => setIsFocused(false)} // when user leaves
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Recent Updates Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent updates</Text>
        </View>

        {/* Top Contacts */}
        <View style={styles.contactsSection}>
          <FlatList
            data={topContacts} //the list of items
            renderItem={renderTopContact} //how the item should look like
            keyExtractor={(item) => item.id} //Unique ID for each item
            horizontal={true} // enables list to scroll from left to right
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contactsList}
          />
        </View>

        <View style={styles.divider} />

        {/* Viewed Updates Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Viewed updates</Text>
        </View>

        <FlatList
          data={viewedUpdates}
          renderItem={renderViewedUpdate}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.viewedList}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0, // Remove border of the input
    outlineWidth: 0
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
  },
  contactsSection: {
    marginTop: 8,
  },
  contactsList: {
    paddingHorizontal: 16,
  },
  contactItem: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 70,
  },
  contactAvatarContainer: {
    marginBottom: 6,
  },
  contactAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  addStoryButton: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#007bff",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  contactName: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  divider: {
    height: 8,
    backgroundColor: "#f8f8f8",
    marginVertical: 16,
  },
  viewedList: {
    paddingHorizontal: 16,
  },
  viewedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  viewedAvatarContainer: {
    marginRight: 12,
  },
  viewedAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd", // Gray border for viewed statuses
  },
  viewedName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  viewedTime: {
    fontSize: 14,
    color: "#999",
  },
});
