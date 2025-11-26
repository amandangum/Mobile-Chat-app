import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const chatData = [
  {
    id: "1",
    name: "Sandra",
    lastMessage: "Doing great!!!",
    timestamp: "10:30 AM",
    unreadCount: 2,
    avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBAQEBIPEBAQDw8PEBAPDw8PDw8PFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQFy0dHSItLS0tLS0tLS0tLS0tKysrLS0tKy0tLS0rKystLS0rLSstLS0tLS0tLS0tLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA6EAABAwIDBQUFBwQDAQAAAAABAAIDBBEFEiEGMUFRYRMicYGRIzJCobEHUnLB0eHwFBUzYiRDgrL/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKBEAAgICAgEDBAIDAAAAAAAAAAECEQMSITEEMkFREyJhcZGhBTOB/9oADAMBAAIRAxEAPwDIR0x5p+KkPNHGVJjRZOg7FSlOf0hRxqQxGwtCM6hNlCqcPKudUOxunsCgUEOGOupkGGOKvqakUxlKlsPQz8eFOVlS4e5pBCtGQKQxircl4wopHAJuoe8qUGJPZFLYPpmZr6Z5uqh1E66209OoT6RGw1BlLBTPtuSZKR/JaOOnsEHQJ7C0ZmhSu5JuajJ4LSOgUeVhRsLRmVfh55KPLQnktNI1RpAjYejMnLTEcE12ZsdFo5Ybpn+kU2UomVmYeSC0M9AeSNKyqFROCmwhZaCvVhBiKCjTRNUljVnI8U6qQzFhzSHRoWxp1kaoGYuOadZi45oCjTwBTGNWWhxkc1MZjI5oA0AanGtVC3GRzTDtpgw94jKgKNU1iV2azMO1IduGnM6KZFtAxyB0WkjFHcxQZsdjG9zR4kBMDGmHcQfC5QFFtkSHNUD+6t5pLsUHNAExzVHlYorsUHNNPxMIAOaNRJGI5cRCivrwgBRYlsjUU1wQbiAQKiS+NBRHV4QQM5226eY9y0+FbOCS2hK0EOwV+HzUNiRzrtHpJqH810Kp2Iy8CsvjGBmI9EJjKUVb+aWK1/NPwURcrBuBXG/VPZBqysbXv5p5uJSc1Nbs+++7RPy4OIgHO6fshSTHqxUMrrAucdRdV0kpc7Q6k7zw", 
    isOnline: true,
    messages: [
      { id: '1', text: 'Hey there! How are you doing?', isUser: false, timestamp: '10:25 AM' },
      { id: '2', text: 'I\'m good! How about you?', isUser: true, timestamp: '10:26 AM' },
      { id: '3', text: 'Doing great!!!', isUser: false, timestamp: '10:30 AM' },
    ],
  },
  {
    id: "2",
    name: "Mommy❤",
    lastMessage: "When you get back home, make egg sauce",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
    messages: [
      { id: '1', text: 'When you get back home, make egg sauce', isUser: false, timestamp: 'Yesterday' },
    ],
  },

  {
    id: "3",
    name: "Marilyne",
    lastMessage: "Thank You for your help",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
    messages: [
      { id: '1', text: 'Thank you for your Help', isUser: false, timestamp: 'Yesterday' },
    ],
  },

  {
    id: "4",
    name: "Alex",
    lastMessage: "Did you see the new design?",
    timestamp: "16:00",
    unreadCount: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // your base64 image
    isOnline: true,
    messages: [
      { id: '1', text: 'Good afternoon Amanda', isUser: false, timestamp: '10:25 AM' },
      { id: '2', text: 'Hi good afternoon', isUser: true, timestamp: '10:26 AM' },
      { id: '3', text: 'How are you?', isUser: false, timestamp: '10:30 AM' },
      { id: '4', text: 'I am fine and you?', isUser: true, timestamp: '10:30 AM' },
      { id: '5', text: 'I am good too', isUser: false, timestamp: '10:30 AM' },
      { id: '6', text: 'Okay good to hear', isUser: true, timestamp: '10:30 AM' },
      { id: '7', text: 'Did you see the new design?', isUser: false, timestamp: '10:30 AM' },
    ],
  },

  {
    id: "5",
    name: "Mr Ben",
    lastMessage: "I am fine and you",
    timestamp: "10:00 PM",
    unreadCount: 2,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face", // your base64 image
    isOnline: true,
    messages: [
      { id: '1', text: 'Good afternoon Mr Ben, how are you doing today?', isUser: true, timestamp: '10:25 AM' },
      { id: '2', text: 'Hi good afternoon', isUser: false, timestamp: '10:26 AM' },
    ],
  },
  
  {
    id: "6",
    name: "Abigial",
    lastMessage: "Have you gone home already?",
    timestamp: "10:30 AM",
    unreadCount: 2,
    avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFhUXFxUXFxUVFxcVFRUVFxUWFhUVFxUYHSggGBolGxUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHR0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tKy0tLS0rLS0tKy0tLSstLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAQIEBQYAB//EADsQAAEDAgMFBgQFAgYDAAAAAAEAAhEDIQQFMRJBUWFxBiKBkbHwE6HB0SMyQlLxYqIUcoKywuEHFpL/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACIRAQEAAgICAwEBAQEAAAAAAAABAhEhMQMSIkFRYXGBE//aAAwDAQACEQMRAD8AtgEVgQwiMWewK0J4CRiK1qQMIRWBK1qIGo0RWBLCcGpYTLYcJCiQkJCAZC7ZTgOCFUrAa2TB8JExz4QMVj20+B439UtmmjRV+NdYpMJmjKlgYPA28uI5oGYVbFK05OVC4ySiNCY0IgUNihcuXSgEKaU4lNKZGFcuK5AXwCexl05rUZjVWmJabVIaExjUZoT0CtCeAlaE8BCSAIdZ+yJRisx2sz8YZsi7zZo4c0WnJupWaZxTojaqP2eA3+W9ZTGduCTFKmSOLjsjyCxWOzB9V5fUcSfdhyUc4gmyndbTGTtrnduK40ps6y76lSsu/wDIF9mvTn+pu7w3rF02k6NJPE2CZWZHC" ,
    isOnline: true,
    messages: [
      { id: '1', text: 'Hey hope you arrived', isUser: true, timestamp: '10:25 AM' },
      { id: '2', text: 'Yess i did', isUser: false, timestamp: '10:26 AM' },
      { id: '2', text: 'what about you?', isUser: false, timestamp: '10:26 AM' },
      { id: '2', text: 'Have you gone home already?', isUser: false, timestamp: '10:26 AM' },
    ],
  },
 
];

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [contact, setContact] = useState(null);

  useEffect(() => {
    // Find the contact data
    const foundContact = chatData.find(chat => chat.id === id);
    setContact(foundContact);
    
    // Load messages for this contact
    if (foundContact) {
      setMessages(foundContact.messages || []);
    }
  }, [id]);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message!',
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.isUser ? styles.userMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isUser ? styles.userMessageText : styles.otherMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  if (!contact) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>
        
        <Image source={{ uri: contact.avatar }} style={styles.headerAvatar} />
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{contact.name}</Text>
          <Text style={styles.headerStatus}>
            {contact.isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="videocam" size={24} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="call" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          inverted={false}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachmentButton}>
            <Ionicons name="add" size={24} color="#007bff" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            multiline
            placeholderTextColor="#999"
          />
          
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={inputText.trim().length === 0}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim().length === 0 ? "#ccc" : "#fff"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerStatus: {
    fontSize: 12,
    color: '#007bff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    padding: 5,
    marginLeft: 15,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#1a1a1a',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});