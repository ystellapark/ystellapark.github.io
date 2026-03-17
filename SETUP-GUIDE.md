# Setup Guide: Deploying Your Academic Website to GitHub Pages

This guide walks you through getting your website live on GitHub. No prior Git experience is assumed.

---

## Step 1: Prepare the files

Before uploading to GitHub, add your headshot photo:

1. Save your headshot photo as `headshot.jpg`
2. Place it in the `assets/` folder

Your folder structure should look like this:

```
academic-website/
├── index.html              ← Home page
├── research.html           ← Research page
├── cv.html                 ← CV page (HTML version)
├── style.css               ← Shared stylesheet
├── assets/
│   └── headshot.jpg        ← Your photo (YOU ADD THIS)
├── cv-source/
│   ├── main.tex            ← Your LaTeX CV source
│   ├── resume.cls          ← LaTeX class file
│   └── cv.pdf              ← Compiled PDF (auto-generated after first push)
└── .github/
    └── workflows/
        └── compile-cv.yml  ← GitHub Action for auto-compiling LaTeX
```

---

## Step 2: Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button (top right) → **New repository**
3. Name it: `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Example: if your username is `stellaypark`, name it `stellaypark.github.io`
   - **Important:** This specific naming convention is what makes GitHub Pages work automatically
4. Set it to **Public**
5. Do **NOT** check "Add a README file" (we'll push our own files)
6. Click **Create repository**

---

## Step 3: Upload your files

### Option A: Upload via GitHub's web interface (easiest)

1. On your new empty repository page, click **"uploading an existing file"**
2. Drag and drop the **entire contents** of the `academic-website/` folder
   - **Note:** GitHub's web upload doesn't preserve folder structure well. You may need to:
     - First upload the root files (index.html, research.html, cv.html, style.css)
     - Then create folders (`assets`, `cv-source`, `.github/workflows`) and upload files into each
3. Click **Commit changes**

### Option B: Using Git from the command line (recommended)

If you have Git installed (or want to install it):

```bash
# Navigate to the academic-website folder
cd path/to/academic-website

# Initialize a Git repository
git init

# Add all files
git add .

# Create the first commit
git commit -m "Initial website setup"

# Connect to your GitHub repository (replace with YOUR URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab at the top)
3. In the left sidebar, click **Pages**
4. Under "Source", select **Deploy from a branch**
5. Under "Branch", select **main** and **/ (root)**
6. Click **Save**
7. Wait 1-2 minutes, then visit: `https://yourusername.github.io`

Your site should be live!

---

## Step 5: Enable the GitHub Action for auto-compiling your CV

The first time the Action runs, you may need to grant it permission:

1. Go to your repository → **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **Read and write permissions**
3. Click **Save**

Now, every time you edit `cv-source/main.tex` and push, GitHub will:
1. Automatically compile it to PDF
2. Save the PDF as `cv-source/cv.pdf`
3. Your website's "Download CV" link will always point to the latest version

---

## How to Update Your CV Going Forward

This is the whole point — your new workflow is beautifully simple:

1. Edit `cv-source/main.tex` (either locally or directly on GitHub's web editor)
2. Commit and push the change
3. GitHub Action auto-compiles the PDF
4. Your website automatically shows the latest CV

**That's it.** No more Overleaf → Google Drive → Google Sites chain.

### Editing directly on GitHub (easiest for small changes):
1. Go to your repository on GitHub
2. Navigate to `cv-source/main.tex`
3. Click the pencil icon (edit)
4. Make your changes
5. Click **Commit changes**
6. The Action will auto-compile within a minute or two

---

## Optional: Custom Domain

If you want a custom domain like `stellapark.com`:

1. Buy a domain from a registrar (Namecheap, Cloudflare, Google Domains — ~$10-12/year)
2. In your GitHub repository, go to **Settings** → **Pages**
3. Under "Custom domain", enter your domain name and click **Save**
4. At your domain registrar, add DNS records:
   - For apex domain (e.g., `stellapark.com`): Add four A records pointing to:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For `www` subdomain: Add a CNAME record pointing to `yourusername.github.io`
5. Wait for DNS propagation (can take up to 24-48 hours, usually much faster)
6. Back in GitHub Pages settings, check **Enforce HTTPS**

---

## File Reference

| File | What it does | When to edit |
|------|-------------|--------------|
| `index.html` | Home page with bio, photo, links | When you change your bio or contact info |
| `research.html` | Publications and working papers | When you publish or add new papers |
| `cv.html` | HTML version of your CV | When CV content changes (keep in sync with main.tex) |
| `style.css` | Visual styling for all pages | Only if you want to change the design |
| `cv-source/main.tex` | LaTeX source for your CV | Whenever your CV changes — this auto-compiles to PDF |
| `assets/headshot.jpg` | Your profile photo | When you want a new photo |
