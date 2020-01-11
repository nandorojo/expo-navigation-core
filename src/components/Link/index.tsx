import React, { useCallback, ClassAttributes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import useRouting from '../../hooks/use-routing'
import empty from '../../utils/empty'
import { LinkProps } from '..'

/**
 * Link component for react-navigation and nextjs.
 *
 * @param props
 *  - routeName: string
 *  - params?: object
 *  - web?: Dictionary for web, depends on library
 *
 * ## Usage
 *
 * ```diff
 * -import { TouchableOpacity } from 'react-native'
 * -...
 * -<TouchableOpacity onPress={() => navigate({ routeName: 'home', params: { user: 'fernando' } })}>
 * -  Press me!
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
const Link = React.forwardRef(
  <
    ExtraProps extends object = {},
    Params extends object = {},
    Web extends object = {}
  >(
    props: LinkProps<ExtraProps, Params, Web>,
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
        <Text ref={ref} style={props.style} accessibiltyRole="link">
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

export default Link
