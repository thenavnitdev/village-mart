import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

export type DialogType = 'error' | 'warning' | 'success' | 'info';

interface DialogButton {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: 'default' | 'destructive';
}

interface DialogModalProps {
  visible: boolean;
  onClose?: () => void;
  type?: DialogType;
  title?: string;
  message: string;
  buttons?: DialogButton[];
  showCloseButton?: boolean;
  cancelable?: boolean;
}

const DialogModal: React.FC<DialogModalProps> = ({
  visible,
  onClose,
  type = 'info',
  title,
  message,
  buttons,
  showCloseButton = true,
  cancelable = true,
}) => {
  const { theme } = useTheme();

  // Helper function to add alpha to hex color
  const addAlpha = (color: string, alpha: number): string => {
    // Convert hex to rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'error':
        return {
          icon: '⚠️',
          color: theme.colors.error,
          iconBg: addAlpha(theme.colors.error, 0.15),
        };
      case 'warning':
        return {
          icon: '⚠️',
          color: theme.colors.warning,
          iconBg: addAlpha(theme.colors.warning, 0.15),
        };
      case 'success':
        return {
          icon: '✅',
          color: theme.colors.success,
          iconBg: addAlpha(theme.colors.success, 0.15),
        };
      case 'info':
      default:
        return {
          icon: 'ℹ️',
          color: theme.colors.info,
          iconBg: addAlpha(theme.colors.info, 0.15),
        };
    }
  };

  const typeConfig = getTypeConfig();

  const defaultButtons: DialogButton[] = buttons || [
    {
      text: 'OK',
      onPress: () => {
        if (onClose) onClose();
      },
      variant: 'primary',
    },
  ];

  const handleOverlayPress = () => {
    if (cancelable && onClose) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={cancelable && onClose ? onClose : undefined}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(150)}
            style={[
              styles.container,
              {
                backgroundColor: theme.colors.cardBackground,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <View style={styles.content}>
                {/* Header with Icon */}
                <View style={styles.header}>
                  <View
                    style={[
                      styles.iconContainer,
                      {
                        backgroundColor: typeConfig.iconBg,
                      },
                    ]}
                  >
                    <Text style={styles.icon}>{typeConfig.icon}</Text>
                  </View>
                  {showCloseButton && onClose && (
                    <TouchableOpacity
                      onPress={onClose}
                      style={styles.closeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={[styles.closeIcon, { color: theme.colors.textMuted }]}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Title */}
                {title && (
                  <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
                )}

                {/* Message */}
                <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
                  {message}
                </Text>

                {/* Buttons */}
                <View style={styles.buttonsContainer}>
                  {defaultButtons.map((button, index) => {
                    const isDestructive = button.style === 'destructive';
                    const buttonVariant =
                      button.variant || (isDestructive ? 'primary' : 'outline');

                    return (
                      <View
                        key={index}
                        style={[
                          styles.buttonWrapper,
                          defaultButtons.length > 1 && styles.buttonWithMargin,
                        ]}
                      >
                        <Button
                          title={button.text}
                          onPress={button.onPress}
                          variant={buttonVariant}
                          size="medium"
                          style={
                            isDestructive
                              ? { backgroundColor: theme.colors.error }
                              : buttonVariant === 'outline'
                              ? { borderColor: theme.colors.border }
                              : undefined
                          }
                          textStyle={
                            isDestructive
                              ? { color: theme.colors.textLight }
                              : buttonVariant === 'outline'
                              ? { color: theme.colors.text }
                              : undefined
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 16,
    position: 'relative',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonWithMargin: {
    marginHorizontal: 6,
  },
});

export default DialogModal;

