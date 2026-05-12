const dictionaries = {
  'en-IN': {
    contact: {
      title: 'Contact Us',
      description: "We're here to help you on your wellness journey. Reach out to us for any questions or to schedule a consultation.",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send Message'
    }
  },
  hi: {
    contact: {
      title: 'संपर्क करें',
      description: 'हम आपकी स्वास्थ्य यात्रा में मदद करने के लिए यहां हैं। किसी भी प्रश्न या परामर्श के लिए हमसे संपर्क करें।',
      name: 'नाम',
      email: 'ईमेल',
      message: 'संदेश',
      submit: 'संदेश भेजें'
    }
  }
}

export const getDictionary = async (locale) => {
  return dictionaries[locale] || dictionaries['en-IN']
} 