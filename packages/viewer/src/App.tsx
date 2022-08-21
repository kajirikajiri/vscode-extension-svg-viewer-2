import { useEffect, useState } from 'react'
import styled from 'styled-components'

const ViewportWrap = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  contain: strict;
`

const Viewport = styled.div`
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

const zoomPoint = {
  x: 0, y: 0
}
const zoomTarget = {
  x: 0, y: 0
}
const factor = 0.1
const maxScale = 10
const minScale = 0.1

function App() {
  const [count, setCount] = useState(0)
  const [editor, setEditor] = useState({
    scale: 1,
    scroll: {
      x: 0,
      y: 0,
    },
    handleWheel: (e: WheelEvent) => {
      e.preventDefault();

      const isScaling = e.ctrlKey || e.metaKey
      if (isScaling) {
        // https://jsfiddle.net/xta2ccdt/13/

        zoomPoint.x = e.pageX
        zoomPoint.y = e.pageY

        const delta = Math.max(-1, Math.min(1, -e.deltaY))

        zoomTarget.x = (zoomPoint.x - editor.scroll.x) / editor.scale
        zoomTarget.y = (zoomPoint.y - editor.scroll.y) / editor.scale

        editor.scale += delta * factor * editor.scale
        editor.scale = Math.max(minScale, Math.min(maxScale, editor.scale))

        editor.scroll.x = -zoomTarget.x * editor.scale + zoomPoint.x
        editor.scroll.y = -zoomTarget.y * editor.scale + zoomPoint.y

        setEditor({ ...editor })
      } else {
        editor.scroll.x -= e.deltaX
        editor.scroll.y -= e.deltaY
        setEditor({ ...editor })
      }
    }
  })

  useEffect(() => {
    window.addEventListener("wheel", editor.handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', editor.handleWheel)
    }
  }, [])

  return (
    <>
      <ViewportWrap>
        <Viewport style={{
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
        </Viewport>
      </ViewportWrap>
    </>
  )
}

export default App
