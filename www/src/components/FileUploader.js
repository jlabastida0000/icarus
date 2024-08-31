import init, { greet } from '../../../pkg/icarus.js';

// icarus file ingestion/uploader component:
useEffect(() => {
  init().then(() => {
    console.log(greet("WASM"));
  });
}, []);