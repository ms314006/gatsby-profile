---
layout: post
title: JavaScript | Let's going to know about Queue structure!
image: img/let-us-going-to-know-about-queue-structure.jpg
author: GQSM
date: 2021-10-11T20:03:59.149Z
draft: false
tags: 
  - JavaScript
  - Algorithm
  - Queue
---

Hi guys! I am Clark, in the post I am going to try to through JavaScript share and implement Queue data structure, and I will pick the problem about Queue from the Leetcode! Let you guys know more about the application of Queue.

## Queue
Data structure Queue is like the line up. If you want to pay for something, but the clerk is handling the first person of front you, at the situation, you need to in line and be the second person, if other people want to pay, he also need to in line. Until the clerk have handled the first people, you will become the first people.

**Such process of FIFO(First in, first out) is what Queue structure doing and limiting.**

On the other hand, the time complexity also is the point of Queue. For Queue, the execute time will same when you put in or take out item from Queue, whether the Queue own how many items. **Queue have constant time complexity, that is O(1) time complexity.**

So next we are going to stage of implement Queue!

### Implement Queue

Because JavaScript didn't provide Queue structure, so if we want to use Queue structure in JavaScript then we need to implement by ourself.

So what is the method Queue need to use? For a simple Queue, the most basic methods is putting and taking items, that is the enqueue and dequeue.

First, create a Class named Queue, and declare `constructor`, `enqueue` and `dequeue`:

```javascript
class Queue {
  constructor() {
  
  }
  
  enqueue(item) {
  
  }
  
  dequeue() {
  
  }
}
```

For the choice of implement way, though we can direct array structure of JavaScript and array methods, like below:

```javascript
class Queue {
  constructor() {
    this.data = [];
  }
  
  enqueue(item) {
    this.data.unshift(item);
  }
  
  dequeue() {
    return this.data.pop();
  }
}

const queue = new Queue();

queue.enqueue(1); // put 1, current Queue: [1]
queue.enqueue(2); // put 2, current Queue: [2, 1]

console.log(queue.dequeue()); // took 1, current Queue: [2]

queue.enqueue(3); // put 3, current Queue: [3, 2]
console.log(queue.dequeue()); // took 2, current Queue: [3]
```

It looks like we have completed the FIFO part, but according to [this comment](https://medium.com/@brayce1996/%E6%96%87%E4%B8%AD%E6%8F%90%E5%88%B0%E7%94%A8unshift%E5%AF%A6%E4%BD%9Cenqueue-%E5%8A%9F%E8%83%BD%E9%9B%96%E8%83%BD%E9%81%94%E5%88%B0fifo-%E4%BD%86%E6%99%82%E9%96%93%E8%A4%87%E9%9B%9C%E5%BA%A6%E5%8D%BB%E4%B8%8D%E5%90%88%E6%A8%99%E6%BA%96-%E5%9B%A0%E7%82%BAunshift%E7%9A%84time-complexity%E5%AF%A6%E7%82%BAo-n-%E8%80%8C%E9%9D%9Eo-1-6af888f7d186), the execute time of unshift would depend the array own how many items, the below test case is from the comment:

![Screen Shot 2021-10-10 at 10.16.29 PM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/inq6ovqcj08pl0kf9x50.png)
 
If `unshift` is O(1) time complexity, then whether at any situation, the execute time of `unshift` should not be different. base on the above reason, so we can not implement Queue by array.

Let's think a different angle. besides the array of JavaScript, We can through object of JavaScript create a mapping table:

```javascript
class Queue {
  constructor(){
    this.data = {};
    this.head = 0;
    this.tail = 0;
  }
        
  enqueue(item) {
    this.data[this.tail] = item;
    this.tail += 1;
  }
        
  dequeue() {
    if (this.tail === this.head) return undefined;
    const item = this.data[this.head];
    delete this.data[this.head];
    this.head += 1;
    return item;
  }
}

const queue = new Queue();

queue.enqueue(1); // put 1, current Queue: [1]
queue.enqueue(2); // put 2, current Queue: [2, 1]

console.log(queue.dequeue()); // took 1, current Queue: [2]

queue.enqueue(3); // put 3, current Queue: [3, 2]
console.log(queue.dequeue()); // took 2, current Queue: [3]
```

The result of execute is as same as implement by array. The above implement way is through `tail` as the position to put new items, and `head` is the position to take out items. Add `tail` by 1 when `enqueue`, delete the item of `head` position and add `head` by 1 when `dequeue`, because after we take out the item, the item will vanish from the queue.

Also because we implement through mapping table of object, so whether the Queue own how many items, the execute time of I put in or take out items from the Queue is same, that is O(1) time complexity. In this way, the above implement for Queue have followed the FIFO and time complexity of Queue. 🎉

## The Problem About Queue

In the last section of this article, we are going to solve the problem of Leetcode, [1700. Number of Students Unable to Eat Lunch](https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/).

Put simply, the problem would give you two arrays, the first is students, the second is sandwiches. The value of the student and sandwiches would be 1 or 0, The student who value is 1 only take out the sandwich which value is 1, the student who value is 0 only take out the sandwich which value is 0. If the first sandwich is not up the first student street, the student will moved to the end of array, but if the first sandwich happens is up the first student street, the first student will take out the first sandwich and leave the array.

This continues until none of the students want to take the first sandwich, and we need to return how many student unable to eat sandwiches. So there are three situation:

### situation 1
Students: [1,0,1,0] Sandwiches: [0,1,1]
Because the first student is 1, he will not take out the first sandwich which value is 0, so he will go to the end of array.
Students: [0,1,0,1] Sandwiches: [0,1,1]

### situation 2
Students: [0,1,0,1] Sandwiches: [0,1,1]
Because the first student is 0, so he will take out the first sandwich which value is 0 and leave the array.
Students: [1,0,1] Sandwiches: [1,1]

### situation 3
Students: [1,1,1] Sandwiches: [0,1,1]
The first sandwich value is 0, so have no any students want to take out the sandwich, hence there are three students unable eat sandwiches, return 3.

The way of solve problem need to put all students into the Queue, and use loop take the first students, check if the student want to eat the current the first sandwich, if the student want then take out the sandwich, else we need to put the student back to Queue. We can end the loop and return the count of students when have no any students want to take out the first sandwich.

Tidy up the above thinking, the solution is:
```javascript
class MyQueue {
  /*
  constructor
  enqueue
  dequeue
  */
    
  contains(item) {
    return Object.keys(this.data).some(
      (key) => this.data[key] === item
    );
  }
    
  getSize() {
    return this.tail - this.head;
  }
}

var countStudents = function(students, sandwiches) {
  const studentQueue = new MyQueue();
  students.forEach((student) => {
    studentQueue.enqueue(student);
  });
    
  while (studentQueue.contains(sandwiches[0])) {
    const firstStudent = studentQueue.dequeue();
    if (firstStudent === sandwiches[0]) {
      sandwiches.shift();
    } else {
      studentQueue.enqueue(firstStudent);
    }
  }
    
  return studentQueue.getSize();
};
```

I added the `contains` and `getSize` methods in the MyQueue implement besides `enqueue` and `dequeue`. The `contains` can help me check if any students want to take out the first sandwich, and the `getSize` is help me to return remaining count of students.

Beside the above problem, if you want to find more problem to practice Queue, there are some interesting problem about Queue in the Leetcode, like [1670. Design Front Middle Back Queue](https://leetcode.com/problems/design-front-middle-back-queue/) or [225. Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)!

## Final word

At the begin of this article, I introduce the Queue data structure, and explain how to implement by JavaScript, then in the last of the article I solved a problem about Queue!

If above have any problem or mistake point, please comment below, I will reply as soon as I can! thanks for any response! 

## Reference

1. [Queue (abstract data type)](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))
2. [How To Implement a Queue in JavaScript - and Beat Arrays at Their Own Game](https://popovich.io/2020/2020-04-07-queue-javascript/)
3. [The comment about test time complexity of `unshift`](https://medium.com/@brayce1996/%E6%96%87%E4%B8%AD%E6%8F%90%E5%88%B0%E7%94%A8unshift%E5%AF%A6%E4%BD%9Cenqueue-%E5%8A%9F%E8%83%BD%E9%9B%96%E8%83%BD%E9%81%94%E5%88%B0fifo-%E4%BD%86%E6%99%82%E9%96%93%E8%A4%87%E9%9B%9C%E5%BA%A6%E5%8D%BB%E4%B8%8D%E5%90%88%E6%A8%99%E6%BA%96-%E5%9B%A0%E7%82%BAunshift%E7%9A%84time-complexity%E5%AF%A6%E7%82%BAo-n-%E8%80%8C%E9%9D%9Eo-1-6af888f7d186)

## Thanks
Photo by [Zichao Zhang](https://unsplash.com/@shakusky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/queue?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)