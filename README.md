﻿# WorkTheThread
Also having a hard time with Worker Threads?
With this package you can just throw in a function and some arguments and it wil ldoe the rest!

```javascript
const WorkTheThread = require('WorkTheThread');

function add(x, y) {
  return x + y;
}

WorkTheThread(2, 5); // returns 7
```
