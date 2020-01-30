import {
  useNavigation,
  useRoute,
  RouteProp,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native'
import { useCallback } from 'react'
import _ from 'lodash'
import { NavigateTo } from '..'

export default function useRouting<
  T extends RouteProp<ParamListBase, string>,
  N extends NavigationProp<ParamListBase>
>() {
  // @ts-ignore
  const { navigate: nav, push: pushTo, goBack } = useNavigation<N>()

  const { params } = useRoute<T>()

  const navigate = useCallback(
    <To extends NavigateTo = NavigateTo>(route: To) => {
      nav({
        name: route.routeName,
        params: route.params,
        key: route.key,
      })
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
    return _.get(params, param, fallback)
  }

  return { navigate, getParam, push, goBack: () => goBack(), params }
}
