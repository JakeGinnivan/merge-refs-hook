import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { useMergeRefs } from '.'

it('supports both forwarded and local ref', async () => {
    const testRef = React.createRef<HTMLElement>()
    let testComponentLocalRef: React.RefObject<HTMLElement> | undefined
    TestUtils.renderIntoDocument(
        <TestComponent
            ref={testRef}
            verifyLocalRef={local => (testComponentLocalRef = local)}
        />,
    )

    // allow the component to mount
    await new Promise(resolve => setTimeout(resolve))

    expect(testRef.current).toBeDefined()
    expect(testComponentLocalRef).toBeDefined()
    expect(testComponentLocalRef!.current).toBeDefined()
})

interface TestComponentProps {
    verifyLocalRef: (local: React.RefObject<HTMLElement>) => void
}
const InnerTestComponent: React.FC<TestComponentProps> = function TestComponent(
    props,
    ref,
) {
    const local = React.createRef<HTMLDivElement>()
    // Local can be used for hooks which require a ref
    const mergedRef = useMergeRefs(ref, local)

    React.useEffect(() => {
        props.verifyLocalRef(local)
    })

    return <div ref={mergedRef} />
}
InnerTestComponent.displayName = 'InnerTestComponent'
const TestComponent = React.forwardRef<HTMLElement, TestComponentProps>(
    InnerTestComponent,
)
