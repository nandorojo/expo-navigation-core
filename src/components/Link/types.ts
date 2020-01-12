import { TouchableOpacity, TextStyle } from 'react-native'
import { ComponentPropsWithoutRef } from 'react'

export type LinkProps<
  ExtraProps extends object = {},
  Web extends object = {},
  Params extends object = {}
> = {
  /**
   * Required: child component/text
   */
  children: React.ReactNode
  /**
   * Optional: props passed to TouchableOpacity component on native.
   */
  touchableOpacityProps?: ComponentPropsWithoutRef<typeof TouchableOpacity>
  /**
   * Link text style
   */
  style?: TextStyle
  /**
   * Route name to navigate to
   */
  routeName: string
  /**
   * Navigation state parameters to pass to the screen you're navigating to.
   */
  params?: Params
  web?: Web
} & ExtraProps
