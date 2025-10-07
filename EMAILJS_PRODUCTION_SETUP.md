# EmailJS Production Setup Guide

## 🚨 Issue: "Email Service Not Configured" in Production

When you deploy your website to production (GitHub Pages, Vercel, Netlify, etc.), the environment variables from your local `.env.local` file are **not automatically transferred**. You need to configure them manually in your hosting platform.

## 📋 Required Environment Variables

Your application needs these three EmailJS environment variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_2y07pl8
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_1lf3voj
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=ptlt7r-0RT7Vsp52W
```

## 🔧 Platform-Specific Setup Instructions

### For Vercel Deployment

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your project

2. **Navigate to Environment Variables**
   - Go to **Settings** → **Environment Variables**

3. **Add the following variables:**
   ```
   Name: NEXT_PUBLIC_EMAILJS_SERVICE_ID
   Value: service_2y07pl8
   Environment: Production, Preview, Development
   
   Name: NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
   Value: template_1lf3voj
   Environment: Production, Preview, Development
   
   Name: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
   Value: ptlt7r-0RT7Vsp52W
   Environment: Production, Preview, Development
   ```

4. **Redeploy your application**
   - Go to **Deployments** tab
   - Click **Redeploy** on your latest deployment

### For Netlify Deployment

1. **Go to your Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com)
   - Select your site

2. **Navigate to Environment Variables**
   - Go to **Site settings** → **Environment variables**

3. **Add the variables:**
   - Click **Add a variable**
   - Add each of the three variables listed above

4. **Trigger a new deployment**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

### For GitHub Pages with Actions

If using GitHub Actions for deployment, add to your repository secrets:

1. **Go to your GitHub repository**
2. **Settings** → **Secrets and variables** → **Actions**
3. **Add repository secrets:**
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### For Other Hosting Platforms

Most hosting platforms have an environment variables section in their dashboard. Look for:
- **Environment Variables**
- **Config Vars** (Heroku)
- **Build Environment** 
- **Settings** → **Environment**

## 🔍 How to Verify It's Working

1. **After setting environment variables and redeploying:**
   - Visit your production website
   - Go to the Contact page
   - Try submitting the contact form

2. **Expected behavior:**
   - ✅ **Success**: Form submits and shows "Thank you for your message!"
   - ❌ **Still broken**: Shows "Email Service Not Configured"

## 🛠️ Troubleshooting

### If you still see the error after setup:

1. **Check variable names are exact:**
   - Must include `NEXT_PUBLIC_` prefix
   - Case-sensitive
   - No extra spaces

2. **Verify deployment completed:**
   - Environment variables only take effect after redeployment
   - Check deployment logs for any errors

3. **Test in browser console:**
   ```javascript
   // Open browser dev tools on your production site
   console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID)
   // Should show your service ID, not undefined
   ```

### If EmailJS credentials are invalid:

1. **Verify your EmailJS account:**
   - Login to [emailjs.com](https://emailjs.com)
   - Check your Service ID, Template ID, and Public Key
   - Ensure your email service is active

2. **Update credentials if needed:**
   - Get fresh credentials from EmailJS dashboard
   - Update environment variables in your hosting platform
   - Redeploy

## 📧 EmailJS Account Setup (if needed)

If you need to set up EmailJS from scratch:

1. **Create EmailJS account** at [emailjs.com](https://emailjs.com)
2. **Add email service** (Gmail, Outlook, etc.)
3. **Create email template** with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{subject}}`
   - `{{timestamp}}`
4. **Get your credentials:**
   - Service ID (from Services page)
   - Template ID (from Templates page)
   - Public Key (from Account → API Keys)

## ✅ Quick Checklist

- [ ] Environment variables added to hosting platform
- [ ] Variable names are exactly correct (with NEXT_PUBLIC_ prefix)
- [ ] Values match your EmailJS credentials
- [ ] Application redeployed after adding variables
- [ ] Contact form tested on production site
- [ ] Success message appears when form is submitted

## 🔒 Security Note

The `NEXT_PUBLIC_` prefix means these variables are exposed to the browser. This is normal for EmailJS public keys, but never use this prefix for sensitive data like private API keys or passwords.

---

**Need help?** Check your hosting platform's documentation for environment variables, or contact their support team.