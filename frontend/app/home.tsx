import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { fetchUserData } from "../src/api/auth";
import { Ionicons } from '@expo/vector-icons';

interface User {
  name: string;
  email: string;
  kitchenStock: {
    [key: string]: {
      exclude: boolean;
      ingredients: {
        [key: string]: {
          exclude: boolean;
          batches: Array<{
            quantity: number;
            unit: string;
            expirationDate?: Date;
          }>;
        };
      };
    };
  };
}

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
  const rotationAnimations = useRef<{[key: string]: Animated.Value}>({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        // Initialize all categories as expanded and their animations
        const expanded: {[key: string]: boolean} = {};
        const animations: {[key: string]: Animated.Value} = {};
        Object.keys(userData.kitchenStock || {}).forEach(category => {
          expanded[category] = true;
          animations[category] = new Animated.Value(1);
        });
        setExpandedCategories(expanded);
        rotationAnimations.current = animations;
      } catch (err) {
        console.log("Failed to load user", err);
      }
    };
    loadUser();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newState = { ...prev, [categoryName]: !prev[categoryName] };
      
      // Animate the chevron rotation
      Animated.timing(rotationAnimations.current[categoryName], {
        toValue: newState[categoryName] ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      return newState;
    });
  };

  const renderBatch = (batch: {
    quantity: number;
    unit: string;
    expirationDate?: Date;
  }) => (
    <View style={styles.batchItem}>
      <Text style={styles.batchText}>
        {batch.quantity} {batch.unit}{batch.expirationDate ? `, ${batch.expirationDate}` : ''}
      </Text>
    </View>
  );

  const renderIngredient = (name: string, ingredient: {
    exclude: boolean;
    batches: Array<{
      quantity: number;
      unit: string;
      expirationDate?: Date;
    }>;
  }) => (
    <View key={name} style={styles.ingredientContainer}>
      <View style={styles.ingredientHeader}>
        <TouchableOpacity style={styles.checkbox} />
        <Text style={styles.ingredientName}>{name}</Text>
      </View>
      <View style={styles.batchList}>
        {ingredient.batches.map((batch, index) => (
          <View key={index} style={styles.batchItem}>
            <Text style={styles.batchText}>
              {batch.quantity} {batch.unit}{batch.expirationDate ? `, ${batch.expirationDate}` : ''}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCategory = (name: string, category: {
    exclude: boolean;
    ingredients: {
      [key: string]: {
        exclude: boolean;
        batches: Array<{
          quantity: number;
          unit: string;
          expirationDate?: Date;
        }>;
      };
    };
  }) => {
    const ingredientCount = Object.keys(category.ingredients).length;
    const isExpanded = expandedCategories[name] ?? true;
    
    const rotateAnimation = rotationAnimations.current[name]?.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    }) || new Animated.Value(0);

    return (
      <View key={name} style={styles.categoryContainer}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => toggleCategory(name)}
        >
          <TouchableOpacity style={styles.checkbox} />
          <Text style={styles.categoryName}>{name}</Text>
          <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
            <Ionicons name="chevron-down" size={24} color="#666" />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.categorySubtext}>
          {ingredientCount} ingredients
        </Text>
        {isExpanded && (
          <View style={styles.ingredientsList}>
            {Object.entries(category.ingredients).map(([ingredientName, ingredient]) => 
              renderIngredient(ingredientName, ingredient)
            )}
          </View>
        )}
      </View>
    );
  };

  const stats = {
    totalIngredients: Object.values(user?.kitchenStock || {}).reduce(
      (acc, category) => acc + Object.keys(category.ingredients).length,
      0
    ),
    totalCategories: Object.keys(user?.kitchenStock || {}).length
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, {user?.name}</Text>
        <Text style={styles.subheading}>Your Kitchen Stock</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {stats.totalIngredients} ingredients across {stats.totalCategories} categories
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {Object.entries(user?.kitchenStock || {}).map(([categoryName, category]) => 
          renderCategory(categoryName, category)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F0",
    paddingTop: 10
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  greeting: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 24
  },
  subheading: {
    fontSize: 18,
    color: "#666"
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 10
  },
  statsText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#666",
    marginBottom: 4
  },
  content: {
    flex: 1,
    padding: 10
  },
  categoryContainer: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#FFE5D4",
    padding: 15,
    overflow: 'hidden'
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 4
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 10,
    color: "#333333"
  },
  categorySubtext: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 34,
    marginBottom: 12
  },
  ingredientContainer: {
    marginLeft: 34,
    marginBottom: 12
  },
  ingredientHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  ingredientName: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333333"
  },
  batchList: {
    marginLeft: 34
  },
  batchItem: {
    marginBottom: 2
  },
  batchText: {
    fontSize: 14,
    color: "#666666"
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#666666"
  },
  ingredientsList: {
    marginTop: 8
  }
});