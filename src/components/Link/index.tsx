import React, { useCallback } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import useRouting from '../../hooks/use-routing'
import empty from '../../utils/empty'
import { NavigateTo } from '../../hooks'
import { LinkProps } from '../Link/types'

// I made this an "HOC" of sorts to let us both use TS generics for each lib and React.forwardRef

/**
 * Example usage from expo-gatsby-navigation
 *
 * ```es6
 * import React from 'react'
 * import { LinkMaker, LinkProps } from 'expo-navigation-core'
 * import { Text } from 'react-native'
 * import { ExtraLinkProps, GatsbyWebProps } from './types'
 *
 * const Link = React.forwardRef(
 * function Link(
 * 	props: LinkProps<ExtraLinkProps, GatsbyWebProps>,
 * 	ref?: React.Ref<Text>
 * ) {
 * 	const Link = LinkMaker<ExtraLinkProps, GatsbyWebProps>()
 * 	return <Link {...props} ref={ref} />
 * }
 * )
 *
 * export default React.memo(Link)
 * ```
 */

const LinkMaker = <
  ExtraProps extends object = {},
  Web extends object = {},
  Native extends Required<NavigateTo>['native'] = Required<
    NavigateTo
  >['native'],
  Params extends object = {}
>() =>
  React.forwardRef(
    (
      props: LinkProps<ExtraProps, Web, Native, Params>,
      ref?: React.Ref<Text>
    ) => {
      const { navigate } = useRouting()
      const {
        touchableOpacityProps = empty.object,
        routeName,
        params,
        children,
        isText = true,
        native,
      } = props

      const nav = useCallback(() => {
        navigate({
          routeName: routeName || '/',
          params,
          native,
        })
      }, [navigate, routeName, params])

      return (
        <TouchableOpacity {...touchableOpacityProps} onPress={nav}>
          {isText ? (
            <Text ref={ref} style={props.style} accessibiltyRole="link">
              {children}
            </Text>
          ) : (
            children
          )}
        </TouchableOpacity>
      )
    }
  )

export default LinkMaker
