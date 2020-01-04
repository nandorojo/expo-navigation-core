import React, { useCallback } from 'react'
import { TouchableOpacity, Text, TextStyle } from 'react-native'
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
 * -<TouchableOpacity onPress={() => navigate({ routeName: 'home' })}>
 * -  Press me!
 * - </TouchableOpacity>
 *
 * +import { Link } from 'expo-navigation-core'
 ...
 * +<Link routeName="home">
 * +  Press me!
 * +</Link>
 *```
 *
 */
export default function Link<
  ExtraProps extends object = {},
  Web extends object = {}
>(props: LinkProps<ExtraProps, Web>) {
  const { navigate } = useRouting()
  const { touchableOpacityProps = empty.object, routeName, params } = props

  const nav = useCallback(
    () =>
      navigate({
        routeName,
        params,
      }),
    [navigate, routeName, params]
  )

  return (
    <TouchableOpacity {...touchableOpacityProps} onPress={nav}>
      <Text style={props.style as TextStyle}>{props.children}</Text>
    </TouchableOpacity>
  )
}
