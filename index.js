const { Botkit } = require('botkit');

const controller = new Botkit({
  // Bot configuration
});

controller.hears('hello', 'message', async(bot, message) => {
  await bot.reply(message, 'Hi there!');
});

const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`,
});

controller.hears('generate program', 'message', async(bot, message) => {
  // Generate a simple program
  const program = 'console.log("Hello, world!")';

  // Upload the program to GitHub
  const { data: { sha } } = await octokit.repos.getContents({
    owner: 'LucMuhizi',
    repo: 'https://github.com/LucMuhizi/Botkit',
    path: `program${Date.now()}.js`,
  });

  await octokit.repos.createOrUpdateFileContents({
    owner: 'LucMuhizi',
    repo: 'https://github.com/LucMuhizi/Botkit',
    path: `program${Date.now()}.js`,
    message: 'Added new program',
    content: Buffer.from(program).toString('base64'),
    sha,
  });

  await bot.reply(message, 'Program generated and uploaded to GitHub!');
});
