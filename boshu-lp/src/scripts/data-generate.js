const axios = require('axios');
const faker = require('faker');
const readline = require('readline');
const chalk = require('chalk');
const appConfig = require('../config');

faker.locale = 'ja';

const apiEndpoint = appConfig.TestAPI;

const certifications = [
  '正看護師', '准看護師', '介護福祉士', '初任者研修', '実務者研修',
  'ケアマネージャー', '保育士', '幼稚園教諭', '理学療法士', '作業療法士',
  '言語聴覚士', 'その他', '無資格',
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fetchJobData()
  .then((jobs) => displayJobMenu(jobs))
  .catch((err) => {
    console.error(chalk.red('エラー:', err.message));
    rl.close();
  });

async function fetchJobData() {
  try {
    const response = await axios.get(apiEndpoint);
    return response.data;
  } catch (error) {
    console.error(`求人データの取得中にエラーが発生しました: ${error.message}`);
    return [];
  }
}

async function displayJobMenu(jobs) {
  const askForNumber = (question, max) => new Promise((resolve) => {
    rl.question(question, (answer) => {
      const num = parseInt(answer, 10);
      resolve(isNaN(num) || num < 0 || num > max ? 20 : num);
    });
  });

  console.log(chalk.bold('以下から対象の求人を選択してください。'));

  jobs.forEach((job, index) => {
    console.log(chalk.cyan(`${index + 1}. ${job.PK.split("#")[1]}`));
  });

  console.log(chalk.cyan('0. キャンセル'));

  const selectedJobIndex = await askForNumber('対象の求人番号: ', jobs.length);

  if (selectedJobIndex === 0) {
    console.log(chalk.yellow('キャンセル中。ありがとう！'));
    process.exit(0);
  }

  const selectedJob = jobs[selectedJobIndex - 1];
  const selectedJobID = selectedJob.PK.split("#")[1];

  console.log(chalk.bold(`選択中の求人: ${selectedJobID}`));
  console.log(chalk.green('求人要項:'));
  console.log(selectedJob.desc);

  const quantity = await askForNumber('応募数を入力してください( デフォルト: 20): ', 30);

  for (let i = 0; i < quantity; i++) {
    const application = {
      certs: [...new Set(Array.from({ length: certifications.length }, () => certifications[Math.floor(Math.random() * certifications.length)]))],
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      birth_date: faker.date.past(50, '2002-01-01').toISOString().split('T')[0],
      phone_no: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      adr_prefecture: faker.address.state(),
      adr_city: faker.address.city(),
    };

    try {
      const apiRoute =  `${apiEndpoint}/${selectedJobID}/applications`;
      const response = await axios.put(apiRoute, application);

      console.log(`ユーザー${i + 1}のレスポンス・ステータス: ${response.status}`);
    } catch (error) {
      console.error(`ユーザー${i + 1}のエラー: ${error}`);
    }
  }

  process.exit(0);
}