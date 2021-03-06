# Merge refs hook

[![Build Status](https://travis-ci.com/JakeGinnivan/merge-refs-hook.svg?branch=master)](https://travis-ci.com/JakeGinnivan/merge-refs-hook)
[![npm](https://img.shields.io/npm/v/merge-refs-hook)](https://www.npmjs.com/package/merge-refs-hook)

The goal of this package is to make it easy to have a component which requires a ref but also wants to support forwarding refs.

## Example

```tsx
const myComponent = React.forwardRef((props, ref) => {
    const local = React.createRef()

    // Create local ref
    useHookWhichNeedsRef(local)

    // mergeRefs allows you to pass both your local, and forwarded ref
    // and gives you a ref back which can be passed down
    const mergedRef = useMergeRefs(ref, local)

    // You can now use mergedRef and both forwarded and local ref will
    // be updated
    return <div ref={mergedRef} />
})
```
