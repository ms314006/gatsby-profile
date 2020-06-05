---
layout: post
title: How to make a mock of arrow functions of classes for unit testing?
image: img/how-to-make-a-mock-of-arrow-functions-of-classes-for-unit-testing.png
author: GQSM
date: 2020-06-05T15:35:55.149Z
draft: false
tags: 
  - Jest
  - w3HexSchool
---

Hello, you guys! I am Clark! In this post I want to share how to make a mock of arrow functions of classes for unit testing. Because I read the document of Jest at yesterday, And I learned about [ES6 Class Mocks](https://jestjs.io/docs/en/es6-class-mocks), But in that page I saw a section:

> Please note that if you use arrow functions in your classes, they will not be part of the mock. The reason for that is that arrow functions are not present on the object's prototype, they are merely properties holding a reference to a function.

So we can know that if you use arrow functions in classes then they will not be part of the mock. I think that is terrible, arrow functions is more common than before, but I still can't mock they? and the document also didn't explain what should we do if we used arrow functions in our classes.

Next I will use example of document to show this situation, we have two classes:

```javascript
// sound-player.js
export default class SoundPlayer {
  constructor() {
    this.foo = 'bar';
  }

  playSoundFile(fileName) {
    console.log('Playing sound file ' + fileName);
  }
}
```

```javascript
// sound-player-consumer.js
import SoundPlayer from './sound-player';

export default class SoundPlayerConsumer {
  constructor() {
    this.soundPlayer = new SoundPlayer();
  }

  playSomethingCool() {
    const coolSoundFileName = 'song.mp3';
    this.soundPlayer.playSoundFile(coolSoundFileName);
  }
}
```

I can easy make a mock for unit testing, like this:

```javascript
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';
jest.mock('./sound-player'); // SoundPlayer is now a mock constructor

beforeEach(() => {methods:
  SoundPlayer.mockClear();
});

it('We can check if the consumer called a method on the class instance', () => {

  const soundPlayerConsumer = new SoundPlayerConsumer();

  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();

  // mock.instances is available with automatic mocks:
  const mockSoundPlayerInstance = SoundPlayer.mock.instances[0];
  const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
  expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
});
```

It is work well:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/hs9uhe19f7ghhbwm0hfe.png)

But if I just changed playSoundFile of SoundPlayer to arrow functions, like this:

```javascript
// sound-player.js
export default class SoundPlayer {
  constructor() {
    this.foo = 'bar';
  }

  playSoundFile = (fileName) => {
    console.log('Playing sound file ' + fileName);
  }
}
```

And run tests, The result will be fail:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/4wso4q8aewymhfe2aepx.png)

So why should we do? The solution is really easy, you just need make a mock through `jest.fn()`, then defined your arrow functions in classes as the mock. like code below:

```javascript
it('We can check if the consumer called a arrow functions on the class instance', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();

  // Use `jest.fn()` to set up mock of arrow functions.
  const mockPlaySoundFile = jest.fn();
  soundPlayerConsumer.soundPlayer.playSoundFile = mockPlaySoundFile;

  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();

  expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
});
```

The mock work well:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ys9v7d70lfnp3p0vymmm.png)

Please let me know, if you guys have any questions! :)

peace