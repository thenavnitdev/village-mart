import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';

type RewardsNavigationProp = StackNavigationProp<RootStackParamList>;

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  status: 'available' | 'claimed' | 'expired';
  expiryDate?: string;
}

const Rewards: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<RewardsNavigationProp>();

  // Mock rewards data
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Welcome Bonus',
      description: 'Get 100 points on your first order',
      points: 100,
      icon: '🎁',
      status: 'claimed',
    },
    {
      id: '2',
      title: 'Referral Reward',
      description: 'Refer a friend and get 200 points',
      points: 200,
      icon: '👥',
      status: 'available',
    },
    {
      id: '3',
      title: 'Monthly Purchase',
      description: 'Make 5 orders this month to unlock',
      points: 500,
      icon: '🏆',
      status: 'available',
    },
    {
      id: '4',
      title: 'Birthday Special',
      description: 'Happy Birthday! Claim your special reward',
      points: 300,
      icon: '🎂',
      status: 'available',
      expiryDate: '2024-01-31',
    },
  ];

  const totalPoints = 750; // Mock total points

  const getStatusColor = (status: Reward['status']) => {
    switch (status) {
      case 'available':
        return theme.colors.success;
      case 'claimed':
        return theme.colors.textMuted;
      case 'expired':
        return theme.colors.error;
      default:
        return theme.colors.textMuted;
    }
  };

  const handleClaimReward = (reward: Reward) => {
    if (reward.status === 'available') {
      // Handle claim logic
      console.log('Claim reward:', reward);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Rewards & Points"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.textLight}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Points Summary */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Card style={[styles.pointsCard, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.pointsLabel, { color: theme.colors.textLight }]}>
              Total Points
            </Text>
            <Text style={[styles.pointsValue, { color: theme.colors.textLight }]}>
              {totalPoints.toLocaleString()}
            </Text>
            <Text style={[styles.pointsSubtext, { color: theme.colors.textLight }]}>
              100 points = ₹10 discount
            </Text>
          </Card>
        </Animated.View>

        {/* Available Rewards */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            AVAILABLE REWARDS
          </Text>
          {rewards.map((reward, index) => (
            <Animated.View
              key={reward.id}
              entering={FadeInDown.delay(250 + index * 50).springify()}
            >
              <Card style={styles.rewardCard}>
                <View style={styles.rewardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary}20` }]}>
                    <Text style={styles.rewardIcon}>{reward.icon}</Text>
                  </View>
                  <View style={styles.rewardInfo}>
                    <Text style={[styles.rewardTitle, { color: theme.colors.text }]}>
                      {reward.title}
                    </Text>
                    <Text style={[styles.rewardDescription, { color: theme.colors.textMuted }]}>
                      {reward.description}
                    </Text>
                    {reward.expiryDate && (
                      <Text style={[styles.expiryDate, { color: theme.colors.textMuted }]}>
                        Expires: {reward.expiryDate}
                      </Text>
                    )}
                  </View>
                  <View style={styles.rewardPoints}>
                    <Text style={[styles.pointsText, { color: theme.colors.primary }]}>
                      +{reward.points}
                    </Text>
                    <Text style={[styles.pointsLabel, { color: theme.colors.textMuted }]}>
                      points
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.claimButton,
                    {
                      backgroundColor:
                        reward.status === 'available'
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ]}
                  onPress={() => handleClaimReward(reward)}
                  disabled={reward.status !== 'available'}
                >
                  <Text
                    style={[
                      styles.claimButtonText,
                      {
                        color:
                          reward.status === 'available'
                            ? theme.colors.textLight
                            : theme.colors.textMuted,
                      },
                    ]}
                  >
                    {reward.status === 'available'
                      ? 'Claim Reward'
                      : reward.status === 'claimed'
                      ? 'Claimed'
                      : 'Expired'}
                  </Text>
                </TouchableOpacity>
              </Card>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  pointsCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
  },
  pointsSubtext: {
    fontSize: 12,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 4,
  },
  rewardCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardIcon: {
    fontSize: 28,
  },
  rewardInfo: {
    flex: 1,
    marginRight: 12,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  rewardPoints: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  pointsLabel: {
    fontSize: 11,
  },
  claimButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  claimButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Rewards;

