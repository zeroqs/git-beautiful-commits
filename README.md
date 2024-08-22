# 🌌 Beautiful Commits

**Beautiful Commits** is a CLI tool that helps make your commits beautiful and expressive by adding emojis to the beginning of commit messages.

![Beautiful Commits](https://img.shields.io/badge/version-0.1.1-blue.svg)

<hr>

## 🌌 Example
1. Make a commit, and Beautiful Commits will automatically prepend the selected emoji to your commit message.
```bash
git commit -m "Your commit message"
```
After running the command, your commit message will look like this:
```
🌀 Your commit message
```

## 🔥 Usage
Use the `init` command to initialize configuration and dependencies for a new project.

<hr>

```
npx beautiful-commits init
```
If you don't have the husky package installed yet, it will be downloaded as a dev dependency

<hr>

You will be asked to choose which emoji you want to use

```
? 🎯 Select emoji to add to the start of the commit » 💡 Enter to submit.
>   🔥
>   ☄️
>   🌀
>   🌕
>   🏝️
>   👹
```
A configuration file `beautiful-commits.config.json` will be created with the selected emoji

## 🔧 Configuration
Beautiful Commits allows you to configure various aspects of commit handling.\
The beautiful-commits.config.json file lets you specify the emoji to prepend to commit messages.

Example configuration file:

```json
{
  "selectedEmoji": "🔥"
}
```
You can edit emoji in configuration file
> If the configuration file is missing or the emoji is not specified, the default value ☄️ will be used.
