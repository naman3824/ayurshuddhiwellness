'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '../components/AdminProtection';
import { db } from '../../../lib/firebaseClient';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

function ManageMessagesContent() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setStatusMsg('');
      const q = query(collection(db, 'homepage_messages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
        created_at: d.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      }));
      setMessages(fetched);
    } catch (error) {
      setStatusMsg('Failed to fetch messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deactivateMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'homepage_messages', messageId));
      setMessages(messages.filter(m => m.id !== messageId));
      setStatusMsg('Message deleted successfully!');
    } catch (error) {
      setStatusMsg('Failed to delete message. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-green-400">📋 Manage Messages</h1>
              <div className="flex space-x-3">
                <button
                  onClick={() => router.push('/admin/post-message')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors border border-green-500 font-medium"
                >
                  ➕ Post New Message
                </button>
                <button
                  onClick={() => router.push('/admin')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors border border-gray-500"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
            <p className="text-gray-300 mt-2">View and manage all admin messages</p>
          </div>

          {/* Status Message */}
          {statusMsg && (
            <div className={`mb-6 p-4 rounded-lg border ${
              statusMsg.includes('Error') || statusMsg.includes('Failed')
                ? 'bg-red-900 text-red-200 border-red-700'
                : 'bg-green-900 text-green-200 border-green-700'
            }`}>
              <div className="flex items-center">
                <span className="mr-2">
                  {statusMsg.includes('Error') || statusMsg.includes('Failed') ? '❌' : '✅'}
                </span>
                {statusMsg}
              </div>
            </div>
          )}

          {/* Messages List */}
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-300 text-lg">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-400 text-lg mb-6">No active messages found.</p>
                <button
                  onClick={() => router.push('/admin/post-message')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors border border-green-500 font-medium"
                >
                  🚀 Create Your First Message
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-6 hover:bg-gray-700 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Message Header */}
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            msg.message_type === 'text' 
                              ? 'bg-blue-600 text-blue-100 border border-blue-500' 
                              : 'bg-purple-600 text-purple-100 border border-purple-500'
                          }`}>
                            {msg.message_type === 'text' ? '📝 Text' : '🖼️ Image'}
                          </span>
                          <span className="text-sm text-gray-400 bg-gray-600 px-2 py-1 rounded">
                            📅 Created: {formatDate(msg.created_at)}
                          </span>
                        </div>

                        {/* Title */}
                        {msg.title && (
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {msg.title}
                          </h3>
                        )}

                        {/* Content */}
                        {msg.message_type === 'text' && msg.content && (
                          <p className="text-gray-300 mb-3 line-clamp-3 leading-relaxed">
                            {msg.content}
                          </p>
                        )}

                        {/* Image Preview */}
                        {msg.message_type === 'image' && msg.image_url && (
                          <div className="mb-3">
                            <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                              <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src={msg.image_url}
                                    alt={msg.title || 'Message Image'}
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-500 shadow-md"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-green-400 text-sm font-medium mb-2">🖼️ Image Message</p>
                                  {msg.content ? (
                                    <p className="text-gray-300 text-sm leading-relaxed">{msg.content}</p>
                                  ) : (
                                    <p className="text-gray-400 text-sm italic">No description provided</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={() => deactivateMessage(msg.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors border border-red-500 font-medium"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminProtection>
  );
}

export default function ManageMessages() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <ManageMessagesContent />
    </Suspense>
  );
}