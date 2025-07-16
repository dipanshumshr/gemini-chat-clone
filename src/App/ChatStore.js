import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

const useChatStore = create(
    persist(
        (set) => ({
            chatrooms: [],

            createChatroom: (title) => {
                const newChat = {
                    id: nanoid(10),
                    title: title,
                    createdAt: new Date().toISOString(),
                    messages: []
                };
                set((state) => ({
                    chatrooms: [...state.chatrooms, newChat]
                }));
                return newChat;
            },

            addMessage: (roomId, message) =>
                set(state => ({
                    chatrooms: state.chatrooms.map(room =>
                        room.id === roomId
                            ? { ...room, messages: [...room.messages, message] }
                            : room
                    ),
                })),

            deleteChatroom: (id) =>
                set((state) => ({
                    chatrooms: state.chatrooms.filter((chat) => chat.id !== id),
                })),
        }),
        {
            name: "chat-storage"
        }
    )
)

export default useChatStore