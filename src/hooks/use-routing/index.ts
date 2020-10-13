import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback } from 'react'
import get from 'lodash.get'
import { DefaultRouteProp, DefaultNavigationProp, NavigateTo } from './types'

const prefetch = (routeName: string) => {}

export default function useRouting<
  RProp extends DefaultRouteProp = DefaultRouteProp,
  NProp extends DefaultNavigationProp = DefaultNavigationProp
>() {
  const {
    navigate: nav,
    // @ts-ignore
    push: pushTo,
    goBack,
    // @ts-ignore
    popToTop,
    replace: rep,
    setParams,
    dispatch,
    canGoBack,
  } = useNavigation<NProp>()

  const { params } = useRoute<RProp>()

  const navigate = useCallback(
    <To extends NavigateTo = NavigateTo>(route: To) => {
      if (route?.native?.screen) {
        nav(route.routeName, {
          screen: route.native.screen,
          params: route.params,
          key: route.key,
        })
      } else {
        nav({
          name: route.routeName,
          params: route.params,
          key: route.key,
        })
      }
    },
    [nav]
  )
  const push = useCallback(
    <To extends NavigateTo = NavigateTo>(route: To) => {
      if (pushTo) pushTo(route)
      else navigate<To>(route)
    },
    [pushTo, navigate]
  )
  const getParam = <Param>(param: string, fallback?: unknown): Param => {
    return get(params, param, fallback)
  }
  const replace = useCallback(
    <To extends NavigateTo = NavigateTo>({ routeName, params }: To) => {
      rep(routeName, params)
    },
    [rep]
  )

  return {
    navigate,
    getParam,
    push,
    goBack: () => goBack(),
    params,
    prefetch,
    popToTop,
    replace,
    setParams,
    canGoBack,
    pathname: '',
  }
}
