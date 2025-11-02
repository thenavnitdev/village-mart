import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme';
import Divider from './Divider';

interface SettingRowProps {
  title: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
  showDivider?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  badge?: string;
  textColor?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  rightComponent,
  showArrow = false,
  showDivider = true,
  switchValue,
  onSwitchChange,
  badge,
  textColor,
}) => {
  const { theme, isDark } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: 'transparent',
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      marginRight: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      fontSize: 24,
    },
    textContainer: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginRight: 8,
    },
    badge: {
      backgroundColor: isDark ? colors.neutral[700] : '#F3F4F6',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: isDark ? theme.colors.textLight : '#6B7280',
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrow: {
      fontSize: 24,
      color: theme.colors.textMuted,
      marginLeft: 8,
    },
  });
  
  const content = (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            {typeof icon === 'string' ? (
              <Text style={styles.icon}>{icon}</Text>
            ) : (
              icon
            )}
          </View>
        )}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, textColor && { color: textColor }]}>{title}</Text>
            {badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {rightComponent}
        {switchValue !== undefined && onSwitchChange !== undefined && (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: isDark ? colors.neutral[700] : '#E5E7EB', true: theme.colors.primary }}
            thumbColor={theme.colors.textLight}
            ios_backgroundColor={isDark ? colors.neutral[700] : '#E5E7EB'}
          />
        )}
        {showArrow && !rightComponent && switchValue === undefined && (
          <Text style={styles.arrow}>›</Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
        {showDivider && <Divider color={theme.colors.border} />}
      </>
    );
  }

  return (
    <>
      {content}
      {showDivider && <Divider color={theme.colors.border} />}
    </>
  );
};

export default SettingRow;
