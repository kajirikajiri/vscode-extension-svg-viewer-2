import { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'

// type ContainerProps = {
//   offsetX: number
//   offsetY: number
//   size: number
// }

// const Container = styled.div<ContainerProps>`
//   ${props => backgroundPosition(props)}

//   position: relative;
//   overflow: hidden;
//   contain: strict;
//   background-size: auto;
//   flex: 1;
// `

// const backgroundPosition = ({
//   offsetX,
//   offsetY,
//   size,
// }: any) => {
//   return css`
//     background-position: ${offsetX}px ${offsetY}px, calc(${size}px / 2 + ${offsetX}px) calc(${size}px / 2 + ${offsetY}px);
//   `
// }

// const Main = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// `

const Container = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  contain: strict;
`

const View = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: matrix(var(--scale), 0, 0, var(--scale), var(--x), var(--y));
`

const Child = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 400px;
`

const factor = 0.01
const maxScale = 100
const minScale = 0.1

function App() {
  const [count, setCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState({
    scale: 1,
    scroll: {
      x: 0,
      y: 0,
    }
  })

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.ctrlKey || e.metaKey) {
        // https://jsfiddle.net/xta2ccdt/13/

        if (!containerRef.current || !viewRef.current) return
        setEditor({ ...editor })
      } else {
        editor.scroll.x -= e.deltaX
        editor.scroll.y -= e.deltaY
        setEditor({ ...editor })
      }
    }
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <Container ref={containerRef}>
      <View ref={viewRef} style={{
        "--x": editor.scroll.x,
        "--y": editor.scroll.y,
        "--scale": editor.scale,
      } as React.CSSProperties}>
        <Child>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </Child>
      </View>
    </Container>
  )
}

export default App
