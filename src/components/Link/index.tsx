import React, { useCallback, ClassAttributes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import useRouting from '../../hooks/use-routing'
import empty from '../../utils/empty'
import { LinkProps } from '..'

/**
 * Link component for react-navigation and web.
 *
 * @param props
 *  - routeName: string
 *  - params?: object
 *  - web?: Dictionary for web, see docs for details
 *
 * ## Usage
 *
 * ```diff
 * -import { TouchableOpacity, Text } from 'react-native'
 * -...
 * -<TouchableOpacity onPress={() => navigate({ routeName: 'home', params: { user: 'fernando' } })}>
 * -  <Text>Press me!</Text>
 * - </TouchableOpacity>
 *
 * +import { Link } from 'expo-navigation-core'
 ...
 * +<Link routeName="home" params={{ user: 'fernando' }}>
 * +  Press me!
 * +</Link>
 *```
 *
 */

// WORK-AROUND:
// I made this an "HOC" of sorts to let us both use TS generics and React.forwardRef
const LinkMaker = <
  ExtraProps extends object = {},
  Web extends object = {},
  Params extends object = {}
>() =>
  React.forwardRef(
    (
      props: LinkProps<ExtraProps, Web, Params>,
      ref?: ClassAttributes<Text>['ref']
    ) => {
      const { navigate } = useRouting()
      const {
        touchableOpacityProps = empty.object,
        routeName,
        params,
        children,
      } = props

      const nav = useCallback(
        () =>
          navigate({
            routeName: routeName || '/',
            params,
          }),
        [navigate, routeName, params]
      )

      return (
        <TouchableOpacity {...touchableOpacityProps} onPress={nav}>
          <Text style={props.style} accessibiltyRole="link">
            {children}
          </Text>
        </TouchableOpacity>
      )
    }
  )

export default LinkMaker
