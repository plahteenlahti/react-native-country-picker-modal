import * as React from 'react'
import { ModalProps, SafeAreaView, StyleSheet, Platform } from 'react-native'
import { AnimatedModal } from './AnimatedModal'
import { Modal } from './Modal'
import { useTheme } from './CountryTheme'
import { CountryModalContext } from './CountryModalProvider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const CountryModal = ({
  animationType = 'slide',
  animated = true,
  withModal = true,
  disableNativeModal = false,
  children,
  ...props
}: ModalProps & {
  children: React.ReactNode
  withModal?: boolean
  disableNativeModal?: boolean
}) => {
  const { backgroundColor } = useTheme()
  const { teleport } = React.useContext(CountryModalContext)
  const content = (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {children}
    </SafeAreaView>
  )
  React.useEffect(() => {
    if (disableNativeModal) {
      teleport!(<AnimatedModal {...props}>{content}</AnimatedModal>)
    }
  }, [disableNativeModal])
  if (withModal) {
    if (Platform.OS === 'web') {
      return (
        <Modal animationType={animationType} animated={animated} {...props}>
          {content}
        </Modal>
      )
    }
    if (disableNativeModal) {
      return null
    }
    return (
      <Modal animationType={animationType} animated={animated} {...props}>
        {content}
      </Modal>
    )
  }
  return content
}
