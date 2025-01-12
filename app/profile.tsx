import CustomHeader from '@/components/customHeader';
import { useAuth } from '@/store/authStore';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const Profile = () => {
    const user = useAuth((state: any) => state.user);


    return (
        <View style={ styles.container }>
              <Stack.Screen
                        name="Profile"
                        options={{
                          header: () => <CustomHeader title="Profile" left={true} right={true} />,
                        }}
                      />
            <Image
                style={styles.profileImage}
                source={{ uri: 'https://example.com/profile.jpg' }}
            />
            <Text style={styles.name}>{user.email}</Text>
            <Text style={styles.bio}>Software Developer at ElectroHub</Text>
            <Button title="Edit Profile" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default Profile;