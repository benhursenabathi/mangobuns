import { forwardRef } from 'react'
import {
  IconDeviceIpadHorizontal as RectangleHorizontal,
  IconKeyboard as Keyboard,
  IconMouse as Mouse,
  IconWifi as Wifi,
} from '@tabler/icons-react'

const DEVICES = [
  { name: 'Magic Keyboard', icon: Keyboard },
  { name: 'Magic Trackpad', icon: RectangleHorizontal },
  { name: 'Magic Mouse', icon: Mouse },
]

export const MacBook = forwardRef(function MacBook(
  { className = '', name = 'Studio Mac', active = false, compact = false },
  ref,
) {
  return (
    <div className={`macbook ${compact ? 'macbook--compact' : ''} ${className}`}>
      <div className="macbook__lid" ref={ref}>
        <div className="macbook__bezel">
          <span className="macbook__camera" aria-hidden="true" />
          <div className="macbook__screen">
            <div className="desktop">
              <div className="desktop__menu">
                <span className="desktop__apple" aria-hidden="true">●</span>
                <strong>Switchy</strong>
                <span className="desktop__menu-spacer" />
                <Wifi size={10} strokeWidth={2.2} />
                <span>9:41</span>
              </div>

              <div className={`switchy-panel ${active ? 'switchy-panel--active' : ''}`}>
                <div className="switchy-panel__topline">
                  <div>
                    <span className="switchy-panel__eyebrow">AVAILABLE MAC</span>
                    <strong>{name}</strong>
                  </div>
                  <span className="switchy-panel__status">
                    <i /> {active ? 'Connected' : 'Ready'}
                  </span>
                </div>

                <div className="switchy-panel__devices">
                  {DEVICES.map(({ name: deviceName, icon: Icon }) => (
                    <div className="switchy-device-row" key={deviceName}>
                      <span className="switchy-device-row__icon"><Icon size={12} strokeWidth={1.8} /></span>
                      <span>{deviceName}</span>
                      <i className="switchy-device-row__dot" />
                    </div>
                  ))}
                </div>

                <div className="switchy-panel__action">
                  <span>{active ? 'Accessories connected' : 'Switch all devices'}</span>
                  <span aria-hidden="true">{active ? '✓' : '→'}</span>
                </div>
              </div>

              <div className="desktop__dock" aria-hidden="true">
                <span /><span /><span /><span className="desktop__dock-switchy" /><span />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="macbook__base">
        <span className="macbook__notch" />
      </div>
      <div className="macbook__shadow" />
    </div>
  )
})

export function DeviceAsset({ type, className = '', style }) {
  const assets = {
    keyboard: ['Keyboard_transparent.png', 'Magic Keyboard'],
    trackpad: ['Trackpad_transparent.png', 'Magic Trackpad'],
    mouse: ['Mouse_transparent.png', 'Magic Mouse'],
  }
  const [file, alt] = assets[type]

  return (
    <div className={`device-asset device-asset--${type} ${className}`} style={style}>
      <img src={`${import.meta.env.BASE_URL}${file}`} alt={alt} />
    </div>
  )
}
