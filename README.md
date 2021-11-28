# marked-bidi

Add Bidirectional text support to the HTML

# Usage

```js
import marked from "marked";
import markedBidi from "marked-bidi";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-bidi/lib/index.umd.js"></script>


marked.use(markedBidi());

marked("راست left");
// <p dir="auto">راست left</p>
```
