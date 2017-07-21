
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      return knex('cards').insert({
        translation: 'mother',
        character: '妈妈',
        pinyin: 'mama',
        IPA: 'mama',
        male_voice: '',
        female_voice: '',
        tone: 1
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'dog',
        character: '狗',
        pinyin: 'gou',
        IPA: 'gou',
        male_voice: '',
        female_voice: '',
        tone: 3
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'tall',
        character: '高',
        pinyin: 'gao',
        IPA: 'gao',
        male_voice: '',
        female_voice: '',
        tone: 1
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'apple',
        character: '苹果',
        pinyin: 'pingguo',
        IPA: 'pingguo',
        male_voice: '',
        female_voice: '',
        tone: ''
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'beef',
        character: '牛肉',
        pinyin: 'Niúròu',
        IPA: 'Niúròu',
        male_voice: '',
        female_voice: '',
        tone: ''
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'eggs',
        character: '蛋',
        pinyin: 'Dàn',
        IPA: 'Dàn',
        male_voice: '',
        female_voice: '',
        tone: ''
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'door',
        character: '门',
        pinyin: 'mén',
        IPA: 'mén',
        male_voice: '',
        female_voice: '',
        tone: '2'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'I/me',
        character: '我',
        pinyin: 'wǒ',
        IPA: 'wǒ',
        male_voice: '',
        female_voice: '',
        tone: '3'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'wood',
        character: '木',
        pinyin: 'mù',
        IPA: 'mù',
        male_voice: '',
        female_voice: '',
        tone: '4'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'to listen',
        character: '听',
        pinyin: 'tīng',
        IPA: 'tīng',
        male_voice: '',
        female_voice: '',
        tone: '1'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'male',
        character: '男',
        pinyin: 'nán',
        IPA: 'nán',
        male_voice: '',
        female_voice: '',
        tone: '2'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'to see',
        character: '看',
        pinyin: 'kàn',
        IPA: 'kàn',
        male_voice: '',
        female_voice: '',
        tone: '4'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'many',
        character: '多',
        pinyin: 'duō',
        IPA: 'duō',
        male_voice: '',
        female_voice: '',
        tone: '1'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'white',
        character: '白',
        pinyin: 'bái',
        IPA: 'bái',
        male_voice: '',
        female_voice: '',
        tone: '2'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'good',
        character: '好',
        pinyin: 'hǎo',
        IPA: 'hǎo',
        male_voice: '',
        female_voice: '',
        tone: '3'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'to want',
        character: '要',
        pinyin: 'yào',
        IPA: 'yào',
        male_voice: '',
        female_voice: '',
        tone: '4'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'to study',
        character: '学',
        pinyin: 'xué',
        IPA: 'xué',
        male_voice: '',
        female_voice: '',
        tone: '2'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'to miss',
        character: '想',
        pinyin: 'xiǎng',
        IPA: 'xiǎng',
        male_voice: '',
        female_voice: '',
        tone: '3'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'six',
        character: '六',
        pinyin: 'liù',
        IPA: 'liù',
        male_voice: '',
        female_voice: '',
        tone: '4'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'well-behaved',
        character: '乖',
        pinyin: 'guāi',
        IPA: 'guāi',
        male_voice: '',
        female_voice: '',
        tone: '1'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'zero',
        character: '零',
        pinyin: 'líng',
        IPA: 'líng',
        male_voice: '',
        female_voice: '',
        tone: '2'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'small',
        character: '小',
        pinyin: 'xiǎo',
        IPA: 'xiǎo',
        male_voice: '',
        female_voice: '',
        tone: '3'
      });
    }).then(function () {
      return knex('cards').insert({
        translation: 'quick',
        character: '快',
        pinyin: 'kuài',
        IPA: 'kuài',
        male_voice: '',
        female_voice: '',
        tone: '4'
      });
    })
};

