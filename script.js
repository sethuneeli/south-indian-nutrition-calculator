// South Indian Nutrition Calculator
class NutritionCalculator {
    constructor() {
        this.currentUser = 1;
        this.isImperialUnits = false; // false = metric (g/kg), true = imperial (lbs/oz)
        this.dailyTargets = {
            1: { calories: 1700, protein: 85, carbs: 213, fat: 57 },
            2: { calories: 1700, protein: 85, carbs: 213, fat: 57 },
            couple: { 
                sethu: { calories: 1700, protein: 85, carbs: 213, fat: 57 },
                sangeetha: { calories: 1500, protein: 75, carbs: 188, fat: 50 }
            }
        };
        
        // User data storage
        this.userData = {
            1: { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] },
            2: { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] },
            couple: {
                sethu: { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] },
                sangeetha: { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] }
            }
        };
        
        this.menuCollapsed = true;
        this.initializeFoodDatabase();
        this.initializeDietChart();
        this.initializeEventListeners();
        this.loadUserData();
        this.displayFoodItems();
        this.displayDietChart('hydration');
        this.updateNutritionDisplay();
        this.updateRecommendations();
    }

    initializeFoodDatabase() {
        this.southIndianFoods = {
            rice: [
                { name: 'Sambar Rice', calories: 320, protein: 8, carbs: 62, fat: 4, category: 'rice', serving: '1 cup (200g cooked rice + 100ml sambar)', weight: '300g' },
                { name: 'Rasam Rice', calories: 280, protein: 6, carbs: 58, fat: 2, category: 'rice', serving: '1 cup (200g cooked rice + 80ml rasam)', weight: '280g' },
                { name: 'Curd Rice', calories: 250, protein: 7, carbs: 45, fat: 5, category: 'rice', serving: '1 cup (150g cooked rice + 100g curd)', weight: '250g' },
                { name: 'Lemon Rice', calories: 290, protein: 5, carbs: 52, fat: 6, category: 'rice', serving: '1 cup (180g cooked rice)', weight: '180g' },
                { name: 'Coconut Rice', calories: 340, protein: 6, carbs: 48, fat: 12, category: 'rice', serving: '1 cup (170g cooked rice)', weight: '170g' },
                { name: 'Tamarind Rice', calories: 310, protein: 5, carbs: 55, fat: 7, category: 'rice', serving: '1 cup (180g cooked rice)', weight: '180g' },
                { name: 'Bisibelebath', calories: 380, protein: 10, carbs: 65, fat: 8, category: 'rice', serving: '1 cup (200g)', weight: '200g' },
                { name: 'Vangi Bath', calories: 350, protein: 7, carbs: 60, fat: 9, category: 'rice', serving: '1 cup (190g)', weight: '190g' }
            ],
            curry: [
                { name: 'Sambar (1 cup)', calories: 85, protein: 4, carbs: 12, fat: 2, category: 'curry', serving: '1 small bowl', weight: '150ml' },
                { name: 'Rasam (1 cup)', calories: 65, protein: 2, carbs: 10, fat: 1, category: 'curry', serving: '1 small bowl', weight: '150ml' },
                { name: 'Dal Curry', calories: 120, protein: 8, carbs: 15, fat: 3, category: 'curry', serving: '1/2 cup (4 tbsp)', weight: '100g' },
                { name: 'Kootu (Mixed Vegetable)', calories: 95, protein: 4, carbs: 14, fat: 2, category: 'curry', serving: '1/2 cup (4 tbsp)', weight: '80g' },
                { name: 'Avial', calories: 110, protein: 3, carbs: 12, fat: 6, category: 'curry', serving: '1/2 cup (4 tbsp)', weight: '90g' },
                { name: 'Mor Kuzhambu', calories: 80, protein: 3, carbs: 8, fat: 4, category: 'curry', serving: '1 small bowl', weight: '120ml' },
                { name: 'Brinjal Curry', calories: 90, protein: 2, carbs: 10, fat: 5, category: 'curry', serving: '1/2 cup (4 tbsp)', weight: '80g' },
                { name: 'Okra Curry', calories: 85, protein: 3, carbs: 9, fat: 4, category: 'curry', serving: '1/2 cup (4 tbsp)', weight: '75g' },
                { name: 'Drumstick Curry', calories: 75, protein: 4, carbs: 8, fat: 3, category: 'curry', serving: '1/2 cup (4 tbsp)', weight: '85g' },
                { name: 'Potato Curry', calories: 140, protein: 3, carbs: 22, fat: 5, category: 'curry', serving: '1/2 cup (4 tbsp)', weight: '100g' }
            ],
            snacks: [
                { name: 'Idli (2 pieces)', calories: 120, protein: 4, carbs: 22, fat: 1, category: 'snacks', serving: '2 medium pieces', weight: '120g (60g each)' },
                { name: 'Dosa (Plain)', calories: 180, protein: 6, carbs: 28, fat: 4, category: 'snacks', serving: '1 medium dosa (8-inch)', weight: '80g' },
                { name: 'Masala Dosa', calories: 280, protein: 8, carbs: 38, fat: 8, category: 'snacks', serving: '1 medium dosa (10-inch)', weight: '120g' },
                { name: 'Uttapam', calories: 220, protein: 7, carbs: 32, fat: 6, category: 'snacks', serving: '1 piece (6-inch)', weight: '100g' },
                { name: 'Vada (2 pieces)', calories: 180, protein: 5, carbs: 20, fat: 8, category: 'snacks', serving: '2 medium pieces', weight: '80g (40g each)' },
                { name: 'Appam (2 pieces)', calories: 160, protein: 4, carbs: 28, fat: 3, category: 'snacks', serving: '2 pieces (4-inch)', weight: '100g (50g each)' },
                { name: 'Puttu with Kadala', calories: 200, protein: 8, carbs: 32, fat: 4, category: 'snacks', serving: '1 cylindrical piece + 2 tbsp kadala', weight: '150g (100g puttu + 50g kadala)' },
                { name: 'Paniyaram (6 pieces)', calories: 140, protein: 4, carbs: 24, fat: 3, category: 'snacks', serving: '6 small balls', weight: '90g (15g each)' },
                { name: 'Pesarattu', calories: 190, protein: 12, carbs: 25, fat: 4, category: 'snacks', serving: '1 medium piece (8-inch)', weight: '100g' },
                { name: 'Rava Upma', calories: 240, protein: 6, carbs: 38, fat: 7, category: 'snacks', serving: '1 cup', weight: '150g' },
                { name: 'Poha', calories: 180, protein: 4, carbs: 32, fat: 4, category: 'snacks', serving: '1 cup', weight: '120g' },
                { name: 'Akki Roti', calories: 200, protein: 5, carbs: 35, fat: 5, category: 'snacks', serving: '1 medium roti (7-inch)', weight: '80g' }
            ],
            sweets: [
                { name: 'Payasam (1 cup)', calories: 280, protein: 6, carbs: 45, fat: 8, category: 'sweets', serving: '1 small bowl', weight: '150ml' },
                { name: 'Laddu (1 piece)', calories: 150, protein: 3, carbs: 25, fat: 4, category: 'sweets', serving: '1 medium ball', weight: '40g' },
                { name: 'Halwa (1 serving)', calories: 200, protein: 4, carbs: 32, fat: 6, category: 'sweets', serving: '3 tbsp', weight: '60g' },
                { name: 'Kesari Bath', calories: 180, protein: 3, carbs: 28, fat: 6, category: 'sweets', serving: '1/4 cup', weight: '80g' },
                { name: 'Mysore Pak', calories: 220, protein: 4, carbs: 28, fat: 10, category: 'sweets', serving: '1 square piece (2x2 inch)', weight: '45g' },
                { name: 'Jangri', calories: 190, protein: 3, carbs: 30, fat: 6, category: 'sweets', serving: '2 medium spirals', weight: '50g' },
                { name: 'Adhirasam', calories: 160, protein: 3, carbs: 26, fat: 5, category: 'sweets', serving: '1 piece (3-inch)', weight: '40g' }
            ],
            beverages: [
                { name: 'Filter Coffee', calories: 25, protein: 1, carbs: 3, fat: 1, category: 'beverages', serving: '1 tumbler', weight: '150ml' },
                { name: 'Filter Coffee with Milk', calories: 45, protein: 2, carbs: 5, fat: 2, category: 'beverages', serving: '1 tumbler with 50ml milk', weight: '200ml' },
                { name: 'Black Coffee (No Sugar)', calories: 5, protein: 0, carbs: 1, fat: 0, category: 'beverages', serving: '1 cup', weight: '150ml' },
                { name: 'Masala Chai', calories: 40, protein: 2, carbs: 6, fat: 1, category: 'beverages', serving: '1 cup', weight: '150ml' },
                { name: 'Buttermilk (1 glass)', calories: 60, protein: 3, carbs: 7, fat: 2, category: 'beverages', serving: '1 tall glass', weight: '200ml' },
                { name: 'Tender Coconut Water', calories: 45, protein: 2, carbs: 9, fat: 0, category: 'beverages', serving: '1 glass', weight: '200ml' },
                { name: 'Panakam', calories: 80, protein: 0, carbs: 20, fat: 0, category: 'beverages', serving: '1 glass', weight: '200ml' },
                { name: 'Neer Mor', calories: 50, protein: 2, carbs: 6, fat: 2, category: 'beverages', serving: '1 glass', weight: '200ml' },
                { name: 'Badam Milk', calories: 120, protein: 4, carbs: 15, fat: 5, category: 'beverages', serving: '1 glass', weight: '200ml' }
            ],
            proteins: [
                { name: 'Boiled Egg Whites (4)', calories: 68, protein: 14, carbs: 1, fat: 0.2, category: 'proteins', serving: '4 egg whites', weight: '130g' },
                { name: 'Chicken Breast (Cooked)', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'proteins', serving: '100g cooked', weight: '100g' },
                { name: 'Fish Fry', calories: 130, protein: 20, carbs: 2, fat: 4, category: 'proteins', serving: '100g cooked', weight: '100g' },
                { name: 'Prawns (Cooked)', calories: 85, protein: 18, carbs: 1, fat: 1, category: 'proteins', serving: '100g cooked', weight: '100g' },
                { name: 'Paneer (Low Fat)', calories: 80, protein: 11, carbs: 3, fat: 4, category: 'proteins', serving: '100g', weight: '100g' },
                { name: 'Soy Chunks (Dry)', calories: 345, protein: 52, carbs: 33, fat: 1, category: 'proteins', serving: '60g dry', weight: '60g' },
                { name: 'Whole Egg (1)', calories: 78, protein: 6, carbs: 1, fat: 5, category: 'proteins', serving: '1 medium egg', weight: '50g' },
                { name: 'Moong Dal (Cooked)', calories: 104, protein: 7, carbs: 19, fat: 0.4, category: 'proteins', serving: '100g cooked', weight: '100g' }
            ],
            fruits: [
                { name: 'Pomegranate', calories: 67, protein: 1.3, carbs: 17, fat: 0.3, category: 'fruits', serving: '80g (1/2 cup seeds)', weight: '80g' },
                { name: 'Papaya', calories: 43, protein: 0.5, carbs: 11, fat: 0.3, category: 'fruits', serving: '100g (1 cup cubes)', weight: '100g' },
                { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, category: 'fruits', serving: '100g (1 small)', weight: '100g' },
                { name: 'Kiwi', calories: 61, protein: 1.1, carbs: 15, fat: 0.5, category: 'fruits', serving: '100g (1 large)', weight: '100g' },
                { name: 'Guava', calories: 68, protein: 2.6, carbs: 14, fat: 1, category: 'fruits', serving: '100g (1 medium)', weight: '100g' },
                { name: 'Berries (Mixed)', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, category: 'fruits', serving: '100g (1 cup)', weight: '100g' }
            ],
            nuts_seeds: [
                { name: 'Almonds (5)', calories: 35, protein: 1.3, carbs: 1.3, fat: 3, category: 'nuts_seeds', serving: '5 pieces', weight: '6g' },
                { name: 'Walnuts (2)', calories: 26, protein: 0.6, carbs: 0.5, fat: 2.6, category: 'nuts_seeds', serving: '2 halves', weight: '4g' },
                { name: 'Brazil Nut (1)', calories: 33, protein: 0.7, carbs: 0.6, fat: 3.3, category: 'nuts_seeds', serving: '1 piece', weight: '5g' },
                { name: 'Pumpkin Seeds', calories: 14, protein: 0.6, carbs: 0.4, fat: 1.2, category: 'nuts_seeds', serving: '1/2 tsp', weight: '2.5g' },
                { name: 'Sunflower Seeds', calories: 15, protein: 0.5, carbs: 0.6, fat: 1.3, category: 'nuts_seeds', serving: '1/2 tsp', weight: '2.5g' },
                { name: 'Chia Seeds', calories: 49, protein: 1.7, carbs: 4.2, fat: 3.1, category: 'nuts_seeds', serving: '10g (1 tbsp)', weight: '10g' },
                { name: 'Flaxseed Powder', calories: 15, protein: 0.5, carbs: 0.8, fat: 1.2, category: 'nuts_seeds', serving: '1 tsp', weight: '3g' }
            ]
        };

        // Flatten all foods into a single array for searching
        this.allFoods = [];
        Object.values(this.southIndianFoods).forEach(category => {
            this.allFoods = this.allFoods.concat(category);
        });
    }

    initializeDietChart() {
        this.dietChart = {
            hydration: {
                title: "Daily Hydration Protocol",
                content: [
                    {
                        title: "Morning Start (Upon Waking)",
                        description: "Start your day with 2 glasses of water"
                    },
                    {
                        title: "After 30 Minutes",
                        description: "Have another 2 glasses of water"
                    },
                    {
                        title: "Detox Water (After Another 30 Minutes)",
                        description: "Add detox water with jeera (cumin), dhaniya (coriander), methi (fenugreek)"
                    },
                    {
                        title: "Seeds & Nuts Daily",
                        description: "Almonds - 5 pieces (6g) | Walnuts - 2 pieces (4g) | Brazil nut - 1 piece (5g) | Pumpkin seeds - 0.5 tsp (2.5g) | Sunflower seeds - 0.5 tsp (2.5g)"
                    },
                    {
                        title: "Portion Control Tips",
                        description: "Use kitchen scale for accurate measurements | 1 cup = 240ml | 1 tbsp = 15ml | 1 tsp = 5ml"
                    }
                ]
            },
            breakfast: {
                title: "Breakfast Schedule (9:00 AM)",
                meals: [
                    {
                        day: "Monday",
                        meal: "Filter Coffee (1 tumbler) + Boiled eggs (4 whites = 130g) + pomegranate (80g) + seeds and nuts (20g total)",
                        calories: "295-305 calories",
                        protein: "23g protein approx"
                    },
                    {
                        day: "Tuesday", 
                        meal: "Filter Coffee (1 tumbler) + Boiled eggs (4 whites = 130g) + papaya (100g) + seeds and nuts (20g total)",
                        calories: "295-305 calories",
                        protein: "23g protein approx"
                    },
                    {
                        day: "Wednesday",
                        meal: "Filter Coffee (1 tumbler) + Boiled eggs (4 whites = 130g) + apple (100g) + seeds and nuts (20g total)", 
                        calories: "295-305 calories",
                        protein: "23g protein approx"
                    },
                    {
                        day: "Thursday",
                        meal: "Filter Coffee (1 tumbler) + Boiled eggs (4 whites = 130g) + kiwi (100g) + seeds and nuts (20g total)",
                        calories: "295-305 calories", 
                        protein: "23g protein approx"
                    },
                    {
                        day: "Friday",
                        meal: "Filter Coffee (1 tumbler) + Boiled eggs (4 whites = 130g) + guava (100g) + seeds and nuts (20g total)",
                        calories: "295-305 calories",
                        protein: "23g protein approx"
                    },
                    {
                        day: "Saturday",
                        meal: "Filter Coffee (1 tumbler) + Overnight oats: rolled oats (30g), chia seeds (10g), almond milk (50ml) + apple (50g) + berries (50g) + nuts and seeds (20g total)",
                        calories: "395 calories",
                        protein: "13-14g protein approx"
                    },
                    {
                        day: "Sunday", 
                        meal: "Filter Coffee (1 tumbler) + Boiled eggs (4 whites = 130g) + berries (100g) + seeds and nuts (20g total)",
                        calories: "295-305 calories",
                        protein: "23g protein approx"
                    }
                ]
            },
            lunch: {
                title: "Lunch Schedule (1:00 PM - 1:30 PM)",
                meals: [
                    {
                        day: "Monday",
                        meal: "Rice (150g cooked) + methi dal (50g cooked) + vegetables (100g steamed/stir-fried) + chicken breast (150g raw/100g cooked) + yogurt",
                        calories: "480 calories",
                        protein: "40-43g protein (without yogurt)"
                    },
                    {
                        day: "Tuesday",
                        meal: "Rice (150g cooked) + beerakay curry (150g raw) + vegetables (60g steamed/stir-fried) + chicken thigh (100g cooked)/soy granules (60g) + yogurt",
                        calories: "480-500 calories",
                        protein: "40-42g protein"
                    },
                    {
                        day: "Wednesday", 
                        meal: "Pulses rice with coconut milk (mixed pulses 30g raw, rice 50g raw, veggies 60g, coconut milk 50ml) + chicken curry (100g cooked)/low fat paneer (100g) + yogurt",
                        calories: "520 calories",
                        protein: "37g protein"
                    },
                    {
                        day: "Thursday",
                        meal: "Rice (150g cooked) + bendi curry (80g) + rasam + fish fry (100g)/edamame (100g) + salad (80g) + yogurt",
                        calories: "480-500 calories", 
                        protein: "38-40g protein"
                    },
                    {
                        day: "Friday",
                        meal: "Quinoa kichidi (40g quinoa, 30g moong dal raw, 100g veggies, 100g high protein paneer) + yogurt",
                        calories: "480-500 calories",
                        protein: "38g protein"
                    },
                    {
                        day: "Saturday",
                        meal: "Rice (150g cooked) + palak dal (50g cooked) + beans fry (60g) + fish fry (100g)/soy chunks (60g dry) + salad + yogurt",
                        calories: "500 calories", 
                        protein: "42g protein approx"
                    },
                    {
                        day: "Sunday",
                        meal: "Rice + roti pachadi + sambar (70g vegetables) + prawns (150g)/low fat paneer (100g) OR Chicken biryani (50g rice raw, chicken 150g raw, veggies 100g) + yogurt",
                        calories: "400 calories",
                        protein: "38-40g protein"
                    }
                ]
            },
            dinner: {
                title: "Dinner Schedule (7:00 PM) - As Early As Possible",
                meals: [
                    {
                        day: "Monday",
                        meal: "Millet idli (2) + pudeena chutney + fish fry (100g) + cucumber & carrots (40g) + buttermilk with flaxseed powder",
                        calories: "450 calories",
                        protein: "28g protein"
                    },
                    {
                        day: "Tuesday",
                        meal: "Millet dosa + tomato chutney + chicken breast (100g) + buttermilk with flaxseed powder",
                        calories: "420-450 calories",
                        protein: "30g protein"
                    },
                    {
                        day: "Wednesday",
                        meal: "Pesarattu (add soy chunks to batter) + veggies + buttermilk with flaxseed powder", 
                        calories: "380-400 calories",
                        protein: "25g protein"
                    },
                    {
                        day: "Thursday",
                        meal: "Lobia salad (40g lobia, 60g veggies) OR Lobia tikkies with veggies + buttermilk with flaxseed powder",
                        calories: "200 calories",
                        protein: "12g protein"
                    },
                    {
                        day: "Friday", 
                        meal: "Chicken salad (100g chicken breast, 80g veggies) + buttermilk with flaxseed powder",
                        calories: "250-300 calories",
                        protein: "25g protein"
                    },
                    {
                        day: "Saturday",
                        meal: "Omelette with veggies (1 whole egg, 3 whites) + buttermilk with flaxseed powder",
                        calories: "200-250 calories", 
                        protein: "20g protein"
                    },
                    {
                        day: "Sunday",
                        meal: "Pesarattu (add soy chunks to batter) + veggies + buttermilk with flaxseed powder",
                        calories: "380-400 calories",
                        protein: "25g protein"
                    }
                ]
            },
            restrictions: {
                title: "Foods Restricted During Weight Loss",
                categories: [
                    {
                        name: "Completely Avoid",
                        items: ["Sugar", "Simple Carbs", "Cakes", "Candy", "Biscuits", "Cookies", "Sweets", "Cool Drinks", "Outside Sauces", "Deep Fried Foods"]
                    }
                ],
                tips: [
                    "Cook in Extra Virgin Olive Oil",
                    "Steamed Food is Preferred", 
                    "Send weight image every Friday with empty stomach",
                    "If craving after early dinner: 20g dark chocolate (70%) OR green tea OR 2-3 walnuts",
                    "For cravings: Crushed ginger + 1 lemon (optional) in 200ml hot water"
                ]
            },
            'couple-plan': {
                title: "Sethu & Sangeetha - Couple Diet Plan",
                sethu: {
                    title: "Sethu (Husband) - 1700 Calories",
                    breakfast: "Filter Coffee + 4 egg whites + fruit (pomegranate/papaya/apple) + nuts (20g)",
                    lunch: "Rice (150g) + dal (50g) + vegetables + chicken breast (100g cooked) + yogurt",
                    snacks: "Fruits + nuts or evening tea/coffee",
                    dinner: "Light meal with proteins + vegetables + minimal carbs"
                },
                sangeetha: {
                    title: "Sangeetha (Wife) - 1500 Calories", 
                    breakfast: "Filter Coffee + 3 egg whites + fruit (pomegranate/papaya/apple) + nuts (15g)",
                    lunch: "Rice (120g) + dal (40g) + vegetables + chicken breast (80g cooked) + yogurt",
                    snacks: "Fruits + nuts or evening tea/coffee",
                    dinner: "Light meal with proteins + vegetables + minimal carbs"
                },
                tips: [
                    "Start day with filter coffee for both",
                    "Eat together at same times when possible",
                    "Use kitchen scale for portion accuracy",
                    "Drink water 30 minutes before meals",
                    "Take evening walks together after dinner"
                ]
            }
        };
    }

    initializeEventListeners() {
        // User selection buttons
        document.getElementById('user1Btn').addEventListener('click', () => this.switchUser(1));
        document.getElementById('user2Btn').addEventListener('click', () => this.switchUser(2));
        document.getElementById('coupleBtn').addEventListener('click', () => this.switchUser('couple'));

        // Menu toggle button
        document.getElementById('menuToggleBtn').addEventListener('click', () => this.toggleFoodMenu());

        // Unit toggle button
        document.getElementById('unitToggleBtn').addEventListener('click', () => this.toggleUnits());

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.displayFoodItems(e.target.dataset.category);
            });
        });

        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => this.searchFoods());
        document.getElementById('foodSearch').addEventListener('input', () => this.searchFoods());
        document.getElementById('foodSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchFoods();
        });

        // Clear log button
        document.getElementById('clearLog').addEventListener('click', () => this.clearFoodLog());

        // Diet chart tabs
        document.querySelectorAll('.diet-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.diet-tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.displayDietChart(e.target.dataset.tab);
            });
        });

        // PDF Generator functionality
        document.getElementById('weekSelect').addEventListener('change', this.handleWeekSelect.bind(this));
        document.getElementById('previewPDF').addEventListener('click', this.previewPDF.bind(this));
        document.getElementById('downloadPDF').addEventListener('click', this.downloadPDF.bind(this));
    }

    switchUser(userNumber) {
        this.currentUser = userNumber;
        
        // Update button states
        document.querySelectorAll('.user-btn').forEach(btn => btn.classList.remove('active'));
        
        if (userNumber === 'couple') {
            document.getElementById('coupleBtn').classList.add('active');
            // Show couple view, hide single user view
            document.getElementById('singleUserView').style.display = 'none';
            document.getElementById('coupleView').style.display = 'block';
            document.getElementById('summaryTitle').innerHTML = 'Daily Nutrition Summary - <span id="currentUser">Sethu & Sangeetha</span>';
            document.getElementById('foodLogTitle').innerHTML = 'Today\'s Food Log - <span id="logUser">Sethu & Sangeetha</span>';
        } else {
            document.getElementById(`user${userNumber}Btn`).classList.add('active');
            // Show single user view, hide couple view
            document.getElementById('singleUserView').style.display = 'grid';
            document.getElementById('coupleView').style.display = 'none';
            document.getElementById('summaryTitle').innerHTML = `Daily Nutrition Summary - <span id="currentUser">Adult ${userNumber}</span>`;
            document.getElementById('foodLogTitle').innerHTML = `Today's Food Log - <span id="logUser">Adult ${userNumber}</span>`;
            document.getElementById('currentUser').textContent = `Adult ${userNumber}`;
            document.getElementById('logUser').textContent = `Adult ${userNumber}`;
        }
        
        // Update displays
        this.updateNutritionDisplay();
        this.updateFoodLog();
        this.updateRecommendations();
    }

    toggleFoodMenu() {
        const foodGrid = document.getElementById('foodResults');
        const toggleBtn = document.getElementById('menuToggleBtn');
        const toggleText = document.getElementById('menuToggleText');
        const toggleIcon = document.getElementById('menuToggleIcon');
        
        this.menuCollapsed = !this.menuCollapsed;
        
        if (this.menuCollapsed) {
            foodGrid.classList.remove('expanded');
            foodGrid.classList.add('collapsed');
            toggleText.textContent = 'Show Food Menu';
            toggleIcon.textContent = '▼';
            toggleBtn.classList.remove('expanded');
        } else {
            foodGrid.classList.remove('collapsed');
            foodGrid.classList.add('expanded');
            toggleText.textContent = 'Hide Food Menu';
            toggleIcon.textContent = '▲';
            toggleBtn.classList.add('expanded');
        }
    }

    toggleUnits() {
        this.isImperialUnits = !this.isImperialUnits;
        
        const toggleText = document.getElementById('unitToggleText');
        const toggleIcon = document.getElementById('unitToggleIcon');
        
        // Update toggle button text
        if (this.isImperialUnits) {
            toggleText.textContent = 'Units: Imperial (lbs/oz)';
        } else {
            toggleText.textContent = 'Units: Metric (g/kg)';
        }
        
        // Trigger icon animation
        toggleIcon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            toggleIcon.style.transform = 'rotate(0deg)';
        }, 300);
        
        // Refresh food display to show converted units
        const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
        this.displayFoodItems(activeCategory);
    }

    convertWeight(weightString) {
        if (!weightString || !this.isImperialUnits) {
            return weightString;
        }
        
        // Extract numeric values and units from weight string
        const result = weightString.replace(/(\d+(?:\.\d+)?)\s*g(?![a-z])/gi, (match, grams) => {
            const g = parseFloat(grams);
            if (g >= 28.35) { // Convert to ounces if >= 1 oz
                const oz = (g / 28.35).toFixed(1);
                return `${oz} oz`;
            } else {
                return match; // Keep small weights in grams
            }
        });
        
        // Convert kg to lbs
        const finalResult = result.replace(/(\d+(?:\.\d+)?)\s*kg/gi, (match, kilos) => {
            const kg = parseFloat(kilos);
            const lbs = (kg * 2.205).toFixed(2);
            return `${lbs} lbs`;
        });
        
        return finalResult;
    }

    displayFoodItems(category = 'all') {
        const foodResults = document.getElementById('foodResults');
        let foodsToShow = [];

        if (category === 'all') {
            foodsToShow = this.allFoods;
        } else {
            foodsToShow = this.southIndianFoods[category] || [];
        }

        if (foodsToShow.length === 0) {
            foodResults.innerHTML = '<div class="empty-state"><h3>No foods found</h3><p>Try a different category or search term.</p></div>';
            return;
        }

        foodResults.innerHTML = foodsToShow.map(food => 
            '<div class="food-item" onclick="nutritionCalc.addFood(\'' + food.name + '\', ' + food.calories + ', ' + food.protein + ', ' + food.carbs + ', ' + food.fat + ')">' +
            '<h4>' + food.name + '</h4>' +
            '<div class="serving-info">' +
            '<strong>Serving:</strong> ' + (food.serving || 'Standard portion') + '<br>' +
            '<strong>Weight:</strong> ' + this.convertWeight(food.weight || 'As per serving') +
            '</div>' +
            '<div class="food-nutrition">' +
            '<span>Calories: ' + food.calories + '</span>' +
            '<span>Protein: ' + food.protein + 'g</span>' +
            '<span>Carbs: ' + food.carbs + 'g</span>' +
            '<span>Fat: ' + food.fat + 'g</span>' +
            '</div>' +
            '</div>'
        ).join('');
    }

    displayDietChart(tab) {
        const dietContent = document.getElementById('dietContent');
        const chartData = this.dietChart[tab];
        
        if (!chartData) return;

        switch (tab) {
            case 'hydration':
                dietContent.innerHTML = '<div class="hydration-guide">' +
                    chartData.content.map(item => 
                        '<div class="hydration-item">' +
                        '<h4>' + item.title + '</h4>' +
                        '<p>' + item.description + '</p>' +
                        '</div>'
                    ).join('') +
                    '</div>';
                break;

            case 'breakfast':
            case 'lunch':
            case 'dinner':
                dietContent.innerHTML = '<h3 style="text-align: center; margin-bottom: 20px; color: var(--primary-color);">' + chartData.title + '</h3>' +
                    '<div class="meal-schedule">' +
                    chartData.meals.map(meal => 
                        '<div class="day-meal" onclick="nutritionCalc.addDietMeal(\'' + meal.day + '\', \'' + tab + '\')">' +
                        '<h4>' + meal.day + '</h4>' +
                        '<div class="meal-details">' +
                        '<strong>Meal:</strong> ' + meal.meal + '<br>' +
                        '<div class="nutrition-info">' +
                        '📊 ' + meal.calories + ' | 🥩 ' + meal.protein +
                        '</div>' +
                        '</div>' +
                        '<button class="quick-add-meal" onclick="event.stopPropagation(); nutritionCalc.quickAddMeal(\'' + meal.day + '\', \'' + tab + '\')">' +
                        'Quick Add to Log' +
                        '</button>' +
                        '</div>'
                    ).join('') +
                    '</div>';
                break;

            case 'restrictions':
                dietContent.innerHTML = '<div class="restrictions-list">' +
                    chartData.categories.map(category => 
                        '<div class="restriction-category">' +
                        '<h4>' + category.name + '</h4>' +
                        '<div class="restriction-items">' +
                        category.items.map(item => 
                            '<span class="restriction-item">' + item + '</span>'
                        ).join('') +
                        '</div>' +
                        '</div>'
                    ).join('') +
                    '<div class="tips-section">' +
                    '<h4>💡 Important Tips</h4>' +
                    chartData.tips.map(tip => 
                        '<div class="tip-item">• ' + tip + '</div>'
                    ).join('') +
                    '</div>' +
                    '</div>';
                break;

            case 'couple-plan':
                dietContent.innerHTML = 
                    '<div class="couple-diet-plan">' +
                    '<h3 style="text-align: center; margin-bottom: 25px; color: var(--primary-color);">' + chartData.title + '</h3>' +
                    '<div class="couple-meal-grid">' +
                    '<div class="person-meals">' +
                    '<h4 style="color: var(--primary-color); margin-bottom: 15px;">' + chartData.sethu.title + '</h4>' +
                    '<div class="meal-item"><strong>Breakfast:</strong> ' + chartData.sethu.breakfast + '</div>' +
                    '<div class="meal-item"><strong>Lunch:</strong> ' + chartData.sethu.lunch + '</div>' +
                    '<div class="meal-item"><strong>Snacks:</strong> ' + chartData.sethu.snacks + '</div>' +
                    '<div class="meal-item"><strong>Dinner:</strong> ' + chartData.sethu.dinner + '</div>' +
                    '</div>' +
                    '<div class="person-meals">' +
                    '<h4 style="color: var(--primary-color); margin-bottom: 15px;">' + chartData.sangeetha.title + '</h4>' +
                    '<div class="meal-item"><strong>Breakfast:</strong> ' + chartData.sangeetha.breakfast + '</div>' +
                    '<div class="meal-item"><strong>Lunch:</strong> ' + chartData.sangeetha.lunch + '</div>' +
                    '<div class="meal-item"><strong>Snacks:</strong> ' + chartData.sangeetha.snacks + '</div>' +
                    '<div class="meal-item"><strong>Dinner:</strong> ' + chartData.sangeetha.dinner + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="couple-tips">' +
                    '<h4>Couple Diet Tips</h4>' +
                    chartData.tips.map(tip => 
                        '<div class="tip-item">' + tip + '</div>'
                    ).join('') +
                    '</div>' +
                    '</div>';
                break;
        }
    }

    addDietMeal(day, mealType) {
        const meal = this.dietChart[mealType].meals.find(m => m.day === day);
        if (meal) {
            this.showNotification(day + ' ' + mealType + ' meal plan details shown. You can manually add individual components.', 'info');
        }
    }

    quickAddMeal(day, mealType) {
        const meal = this.dietChart[mealType].meals.find(m => m.day === day);
        if (meal) {
            // Extract approximate calories and protein from the meal data
            const calorieMatch = meal.calories.match(/(\d+)/);
            const proteinMatch = meal.protein.match(/(\d+)/);
            
            const calories = calorieMatch ? parseInt(calorieMatch[1]) : 300;
            const protein = proteinMatch ? parseInt(proteinMatch[1]) : 20;
            const carbs = Math.round(calories * 0.5 / 4); // Approximate carbs
            const fat = Math.round(calories * 0.3 / 9); // Approximate fat
            
            this.addFood(day + ' ' + mealType.charAt(0).toUpperCase() + mealType.slice(1), calories, protein, carbs, fat);
        }
    }

    searchFoods() {
        const searchTerm = document.getElementById('foodSearch').value.toLowerCase().trim();
        
        if (!searchTerm) {
            this.displayFoodItems();
            return;
        }

        const filteredFoods = this.allFoods.filter(food => 
            food.name.toLowerCase().includes(searchTerm) ||
            food.category.toLowerCase().includes(searchTerm)
        );

        const foodResults = document.getElementById('foodResults');
        
        if (filteredFoods.length === 0) {
            foodResults.innerHTML = '<div class="empty-state"><h3>No foods found</h3><p>Try a different search term.</p></div>';
            return;
        }

        foodResults.innerHTML = filteredFoods.map(food => 
            '<div class="food-item" onclick="nutritionCalc.addFood(\'' + food.name + '\', ' + food.calories + ', ' + food.protein + ', ' + food.carbs + ', ' + food.fat + ')">' +
            '<h4>' + food.name + '</h4>' +
            '<div class="serving-info">' +
            '<strong>Serving:</strong> ' + (food.serving || 'Standard portion') + '<br>' +
            '<strong>Weight:</strong> ' + this.convertWeight(food.weight || 'As per serving') +
            '</div>' +
            '<div class="food-nutrition">' +
            '<span>Calories: ' + food.calories + '</span>' +
            '<span>Protein: ' + food.protein + 'g</span>' +
            '<span>Carbs: ' + food.carbs + 'g</span>' +
            '<span>Fat: ' + food.fat + 'g</span>' +
            '</div>' +
            '</div>'
        ).join('');
    }

    addFood(name, calories, protein, carbs, fat) {
        if (this.currentUser === 'couple') {
            // For couple view, ask which person to add food to
            const person = prompt("Add food for:\n1. Sethu (Husband)\n2. Sangeetha (Wife)\n\nEnter 1 or 2:", "1");
            
            if (person === "1" || person === "sethu" || person === "Sethu") {
                this.addFoodToPerson('sethu', name, calories, protein, carbs, fat);
            } else if (person === "2" || person === "sangeetha" || person === "Sangeetha") {
                this.addFoodToPerson('sangeetha', name, calories, protein, carbs, fat);
            } else {
                this.showNotification('Please select a valid person (1 or 2)', 'warning');
                return;
            }
        } else {
            // Single user view
            const user = this.userData[this.currentUser];
            
            // Add to user's daily totals
            user.calories += calories;
            user.protein += protein;
            user.carbs += carbs;
            user.fat += fat;
            
            // Add to food log with timestamp
            user.foodLog.push({
                name,
                calories,
                protein,
                carbs,
                fat,
                timestamp: new Date().toLocaleTimeString()
            });

            // Update displays
            this.updateNutritionDisplay();
            this.updateFoodLog();
            this.updateRecommendations();
            this.saveUserData();
            
            // Show notification
            this.showNotification(`Added ${name} to Adult ${this.currentUser}'s log`, 'success');
        }
    }

    addFoodToPerson(person, name, calories, protein, carbs, fat) {
        console.log('Adding food to person:', person, 'Food:', name); // Debug log
        
        const userData = this.userData.couple[person];
        console.log('User data before:', JSON.stringify(userData)); // Debug log
        
        // Add to person's daily totals
        userData.calories += calories;
        userData.protein += protein;
        userData.carbs += carbs;
        userData.fat += fat;
        
        // Add to food log with timestamp
        userData.foodLog.push({
            name,
            calories,
            protein,
            carbs,
            fat,
            timestamp: new Date().toLocaleTimeString()
        });

        console.log('User data after:', JSON.stringify(userData)); // Debug log

        // Update displays
        this.updateNutritionDisplay();
        this.updateFoodLog();
        this.updateRecommendations();
        this.saveUserData();
        
        // Show notification
        const personName = person === 'sethu' ? 'Sethu' : 'Sangeetha';
        this.showNotification(`Added ${name} to ${personName}'s log`, 'success');
    }

    removeFood(index) {
        const user = this.userData[this.currentUser];
        const food = user.foodLog[index];
        
        if (food) {
            // Subtract from totals
            user.calories -= food.calories;
            user.protein -= food.protein;
            user.carbs -= food.carbs;
            user.fat -= food.fat;
            
            // Remove from log
            user.foodLog.splice(index, 1);
            
            // Update displays
            this.updateNutritionDisplay();
            this.updateFoodLog();
            this.updateRecommendations();
            this.saveUserData();
            
            this.showNotification(`Removed ${food.name} from log`, 'success');
        }
    }

    clearFoodLog() {
        if (this.currentUser === 'couple') {
            // For couple view, ask which person's log to clear
            const choice = prompt("Clear food log for:\n1. Sethu (Husband)\n2. Sangeetha (Wife)\n3. Both\n\nEnter 1, 2, or 3:", "3");
            
            if (choice === "1" || choice === "sethu" || choice === "Sethu") {
                if (confirm('Clear all food entries for Sethu?')) {
                    this.userData.couple.sethu = {
                        calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: []
                    };
                    this.showNotification('Sethu\'s food log cleared', 'success');
                }
            } else if (choice === "2" || choice === "sangeetha" || choice === "Sangeetha") {
                if (confirm('Clear all food entries for Sangeetha?')) {
                    this.userData.couple.sangeetha = {
                        calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: []
                    };
                    this.showNotification('Sangeetha\'s food log cleared', 'success');
                }
            } else if (choice === "3" || choice === "both" || choice === "Both") {
                if (confirm('Clear all food entries for both Sethu & Sangeetha?')) {
                    this.userData.couple.sethu = {
                        calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: []
                    };
                    this.userData.couple.sangeetha = {
                        calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: []
                    };
                    this.showNotification('Both food logs cleared', 'success');
                }
            } else {
                this.showNotification('Please select a valid option (1, 2, or 3)', 'warning');
                return;
            }
            
            this.updateNutritionDisplay();
            this.updateFoodLog();
            this.updateRecommendations();
            this.saveUserData();
        } else {
            // Single user view
            if (confirm(`Clear all food entries for Adult ${this.currentUser}?`)) {
                this.userData[this.currentUser] = {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    foodLog: []
                };
                
                this.updateNutritionDisplay();
                this.updateFoodLog();
                this.updateRecommendations();
                this.saveUserData();
                
                this.showNotification('Food log cleared', 'success');
            }
        }
    }

    updateNutritionDisplay() {
        if (this.currentUser === 'couple') {
            // Update couple view
            const sethuData = this.userData.couple.sethu;
            const sangeethaData = this.userData.couple.sangeetha;
            
            // Update Sethu's data
            document.getElementById('sethuCalories').textContent = Math.round(sethuData.calories);
            document.getElementById('sethuProtein').textContent = Math.round(sethuData.protein);
            
            // Update Sangeetha's data  
            document.getElementById('sangeethaCalories').textContent = Math.round(sangeethaData.calories);
            document.getElementById('sangeethaProtein').textContent = Math.round(sangeethaData.protein);
            
            // Update progress bars
            const sethuCalorieProgress = (sethuData.calories / this.dailyTargets.couple.sethu.calories) * 100;
            const sangeethaCalorieProgress = (sangeethaData.calories / this.dailyTargets.couple.sangeetha.calories) * 100;
            
            document.getElementById('sethuCalorieProgress').style.width = `${Math.min(sethuCalorieProgress, 100)}%`;
            document.getElementById('sangeethaCalorieProgress').style.width = `${Math.min(sangeethaCalorieProgress, 100)}%`;
        } else {
            // Update single user view
            const user = this.userData[this.currentUser];
            const targets = this.dailyTargets[this.currentUser];
            
            // Update target displays
            document.getElementById('calorieTarget').textContent = targets.calories;
            document.getElementById('proteinTarget').textContent = targets.protein;
            document.getElementById('carbTarget').textContent = targets.carbs;
            document.getElementById('fatTarget').textContent = targets.fat;
            
            // Update counts
            document.getElementById('calorieCount').textContent = Math.round(user.calories);
            document.getElementById('proteinCount').textContent = Math.round(user.protein);
            document.getElementById('carbCount').textContent = Math.round(user.carbs);
            document.getElementById('fatCount').textContent = Math.round(user.fat);
            
            // Update progress bars
            const calorieProgress = (user.calories / targets.calories) * 100;
            const proteinProgress = (user.protein / targets.protein) * 100;
            const carbProgress = (user.carbs / targets.carbs) * 100;
            const fatProgress = (user.fat / targets.fat) * 100;
            
            document.getElementById('calorieProgress').style.width = `${Math.min(calorieProgress, 100)}%`;
            document.getElementById('proteinProgress').style.width = `${Math.min(proteinProgress, 100)}%`;
            document.getElementById('carbProgress').style.width = `${Math.min(carbProgress, 100)}%`;
            document.getElementById('fatProgress').style.width = `${Math.min(fatProgress, 100)}%`;
        }
    }

    updateFoodLog() {
        const foodLogList = document.getElementById('foodLogList');
        console.log('Updating food log. Current user:', this.currentUser); // Debug log
        
        if (this.currentUser === 'couple') {
            // Show combined food log for couple
            const sethuLog = this.userData.couple.sethu.foodLog;
            const sangeethaLog = this.userData.couple.sangeetha.foodLog;
            
            console.log('Sethu log:', sethuLog); // Debug log
            console.log('Sangeetha log:', sangeethaLog); // Debug log
            
            if (sethuLog.length === 0 && sangeethaLog.length === 0) {
                foodLogList.innerHTML = '<div class="empty-state"><h3>No foods logged today</h3><p>Start adding South Indian foods to track nutrition for Sethu & Sangeetha!</p></div>';
                return;
            }

            let html = '';
            
            if (sethuLog.length > 0) {
                html += '<div class="person-food-section">';
                html += '<h4 style="color: var(--primary-color); margin-bottom: 15px;">Sethu\'s Food Log (' + sethuLog.length + ' items)</h4>';
                html += sethuLog.map((food, index) => 
                    '<div class="log-entry sethu-entry">' +
                    '<div class="log-entry-info">' +
                    '<h4>' + food.name + '</h4>' +
                    '<div class="log-entry-nutrition">' +
                    food.calories + ' cal • ' + food.protein + 'g protein • ' + food.carbs + 'g carbs • ' + food.fat + 'g fat' +
                    '</div>' +
                    '<small>Added at ' + food.timestamp + '</small>' +
                    '</div>' +
                    '<button class="remove-btn" onclick="nutritionCalc.removeFoodFromPerson(\'sethu\', ' + index + ')">×</button>' +
                    '</div>'
                ).join('');
                html += '</div>';
            }
            
            if (sangeethaLog.length > 0) {
                html += '<div class="person-food-section">';
                html += '<h4 style="color: var(--primary-color); margin-bottom: 15px; margin-top: ' + (sethuLog.length > 0 ? '25px' : '0') + ';">Sangeetha\'s Food Log (' + sangeethaLog.length + ' items)</h4>';
                html += sangeethaLog.map((food, index) => 
                    '<div class="log-entry sangeetha-entry">' +
                    '<div class="log-entry-info">' +
                    '<h4>' + food.name + '</h4>' +
                    '<div class="log-entry-nutrition">' +
                    food.calories + ' cal • ' + food.protein + 'g protein • ' + food.carbs + 'g carbs • ' + food.fat + 'g fat' +
                    '</div>' +
                    '<small>Added at ' + food.timestamp + '</small>' +
                    '</div>' +
                    '<button class="remove-btn" onclick="nutritionCalc.removeFoodFromPerson(\'sangeetha\', ' + index + ')">×</button>' +
                    '</div>'
                ).join('');
                html += '</div>';
            }
            
            // Add summary
            const totalItems = sethuLog.length + sangeethaLog.length;
            const totalCalories = Math.round(this.userData.couple.sethu.calories + this.userData.couple.sangeetha.calories);
            html += '<div class="couple-summary-bar">';
            html += '<div class="summary-stats">';
            html += '<span><strong>Total Items:</strong> ' + totalItems + '</span>';
            html += '<span><strong>Combined Calories:</strong> ' + totalCalories + ' cal</span>';
            html += '<span><strong>Targets:</strong> Sethu: 1700 cal | Sangeetha: 1500 cal</span>';
            html += '</div>';
            html += '</div>';
            
            foodLogList.innerHTML = html;
        } else {
            // Single user view
            const user = this.userData[this.currentUser];
            
            if (user.foodLog.length === 0) {
                foodLogList.innerHTML = '<div class="empty-state"><h3>No foods logged today</h3><p>Start adding South Indian foods to track your nutrition!</p></div>';
                return;
            }

            foodLogList.innerHTML = user.foodLog.map((food, index) => 
                '<div class="log-entry">' +
                '<div class="log-entry-info">' +
                '<h4>' + food.name + '</h4>' +
                '<div class="log-entry-nutrition">' +
                food.calories + ' cal • ' + food.protein + 'g protein • ' + food.carbs + 'g carbs • ' + food.fat + 'g fat' +
                '</div>' +
                '<small>Added at ' + food.timestamp + '</small>' +
                '</div>' +
                '<button class="remove-btn" onclick="nutritionCalc.removeFood(' + index + ')">×</button>' +
                '</div>'
            ).join('');
        }
    }

    removeFoodFromPerson(person, index) {
        if (confirm('Remove this food item?')) {
            const userData = this.userData.couple[person];
            const food = userData.foodLog[index];
            
            // Subtract from person's totals
            userData.calories -= food.calories;
            userData.protein -= food.protein;
            userData.carbs -= food.carbs;
            userData.fat -= food.fat;
            
            // Remove from log
            userData.foodLog.splice(index, 1);
            
            // Update displays
            this.updateNutritionDisplay();
            this.updateFoodLog();
            this.updateRecommendations();
            this.saveUserData();
            
            const personName = person === 'sethu' ? 'Sethu' : 'Sangeetha';
            this.showNotification(`Removed ${food.name} from ${personName}'s log`, 'success');
        }
    }

    updateRecommendations() {
        if (this.currentUser === 'couple') {
            // Show recommendations for couple
            const sethuData = this.userData.couple.sethu;
            const sangeethaData = this.userData.couple.sangeetha;
            
            const recommendations = [];
            
            // Recommendations for Sethu
            const sethuCaloriePercentage = (sethuData.calories / this.dailyTargets.couple.sethu.calories) * 100;
            if (sethuCaloriePercentage < 50) {
                recommendations.push({
                    type: 'alert',
                    title: '👨 Sethu - Low Calorie Intake',
                    message: 'Sethu has consumed less than 50% of daily calorie goal (1700). Consider adding rice dishes or protein-rich meals.'
                });
            }
            
            // Recommendations for Sangeetha
            const sangeethaCaloriePercentage = (sangeethaData.calories / this.dailyTargets.couple.sangeetha.calories) * 100;
            if (sangeethaCaloriePercentage < 50) {
                recommendations.push({
                    type: 'alert',
                    title: '👩 Sangeetha - Low Calorie Intake',
                    message: 'Sangeetha has consumed less than 50% of daily calorie goal (1500). Consider adding nutritious South Indian meals.'
                });
            }
            
            // Couple-specific recommendations
            recommendations.push({
                type: 'info',
                title: '☕ Morning Coffee',
                message: 'Start your day together with filter coffee - included in breakfast recommendations!'
            });
            
            recommendations.push({
                type: 'success',
                title: '🚶‍♀️ Couple Activities',
                message: 'Take evening walks together and plan meals jointly for better nutrition tracking.'
            });
            
            this.displayRecommendations(recommendations);
        } else {
            // Single user recommendations
            const user = this.userData[this.currentUser];
            const targets = this.dailyTargets[this.currentUser];
            const recommendations = [];
            
            // Calorie recommendations
            const caloriePercentage = (user.calories / targets.calories) * 100;
            
            if (caloriePercentage < 50) {
                recommendations.push({
                    type: 'alert',
                    title: 'Low Calorie Intake',
                    message: 'You\'ve consumed less than 50% of your daily calorie goal. Consider adding rice dishes like Bisibelebath or Coconut Rice.'
                });
            } else if (caloriePercentage > 90) {
                recommendations.push({
                    type: 'warning',
                    title: 'High Calorie Intake',
                    message: 'You\'re approaching your daily calorie limit. Focus on vegetables and lighter proteins for remaining meals.'
                });
            }

            // Protein recommendations
            const proteinPercentage = (user.protein / targets.protein) * 100;
            
            if (proteinPercentage < 60) {
                recommendations.push({
                    type: 'info',
                    title: 'Increase Protein Intake',
                    message: 'Add protein-rich foods like boiled eggs, chicken breast, or paneer to reach your daily protein goal.'
                });
            }

            // Hydration reminder
            recommendations.push({
                type: 'success',
                title: 'Stay Hydrated',
                message: 'Remember to drink water 30 minutes before meals and include detox water with jeera and dhaniya.'
            });

            this.displayRecommendations(recommendations);
        }
    }

    displayRecommendations(recommendations) {
        const recommendationsList = document.getElementById('recommendationsList');
        
        if (recommendations.length === 0) {
            recommendationsList.innerHTML = '<div class="recommendation"><h4>All Good!</h4><p>You\'re doing great with your nutrition tracking.</p></div>';
            return;
        }

        recommendationsList.innerHTML = recommendations.map(rec => 
            '<div class="recommendation ' + rec.type + '">' +
            '<h4>' + rec.title + '</h4>' +
            '<p>' + rec.message + '</p>' +
            '</div>'
        ).join('');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    saveUserData() {
        localStorage.setItem('nutritionCalcData', JSON.stringify(this.userData));
    }

    loadUserData() {
        const savedData = localStorage.getItem('nutritionCalcData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            
            // Ensure the couple structure exists in loaded data
            if (!parsedData.couple) {
                parsedData.couple = {
                    sethu: { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] },
                    sangeetha: { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] }
                };
            }
            
            // Ensure sethu and sangeetha exist
            if (!parsedData.couple.sethu) {
                parsedData.couple.sethu = { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] };
            }
            if (!parsedData.couple.sangeetha) {
                parsedData.couple.sangeetha = { calories: 0, protein: 0, carbs: 0, fat: 0, foodLog: [] };
            }
            
            this.userData = parsedData;
            console.log('Loaded user data:', this.userData); // Debug log
        }
    }

    exportData() {
        const data = {
            date: new Date().toISOString().split('T')[0],
            userData: this.userData
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nutrition-data-${data.date}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    handleWeekSelect() {
        const weekSelect = document.getElementById('weekSelect');
        const customDate = document.getElementById('customDate');
        
        if (weekSelect.value === 'custom') {
            customDate.style.display = 'block';
        } else {
            customDate.style.display = 'none';
        }
    }

    getWeekDates() {
        const weekSelect = document.getElementById('weekSelect');
        const customDate = document.getElementById('customDate');
        let startDate = new Date();
        
        switch (weekSelect.value) {
            case 'current':
                startDate = this.getMonday(new Date());
                break;
            case 'next':
                startDate = this.getMonday(new Date());
                startDate.setDate(startDate.getDate() + 7);
                break;
            case 'custom':
                if (customDate.value) {
                    startDate = this.getMonday(new Date(customDate.value));
                } else {
                    startDate = this.getMonday(new Date());
                }
                break;
        }
        
        return this.getWeekDaysArray(startDate);
    }

    getMonday(date) {
        const day = date.getDay() || 7;
        if (day !== 1) {
            date.setHours(-24 * (day - 1));
        }
        return date;
    }

    getWeekDaysArray(startDate) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push({
                date: date,
                dayName: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
                dateStr: date.toLocaleDateString()
            });
        }
        return days;
    }

    generateShoppingList() {
        return {
            proteins: ['Eggs (2 dozen)', 'Chicken Breast (1.5 kg)', 'Fish (1 kg)', 'Prawns (500g)', 'Paneer (500g)', 'Soy chunks (200g)'],
            fruits: ['Pomegranate (2)', 'Papaya (1)', 'Apple (7)', 'Kiwi (3)', 'Guava (3)', 'Mixed berries (500g)'],
            vegetables: ['Brinjal (1 kg)', 'Okra (500g)', 'Beans (500g)', 'Drumsticks (500g)', 'Potato (1 kg)', 'Carrots (500g)', 'Cucumber (1 kg)', 'Tomatoes (1 kg)', 'Onions (1 kg)'],
            grains_pulses: ['Rice (5 kg)', 'Moong dal (1 kg)', 'Toor dal (1 kg)', 'Mixed pulses (500g)', 'Quinoa (500g)', 'Rava (500g)', 'Poha (500g)'],
            nuts_seeds: ['Almonds (200g)', 'Walnuts (100g)', 'Brazil nuts (50g)', 'Pumpkin seeds (100g)', 'Sunflower seeds (100g)', 'Chia seeds (200g)', 'Flax seeds (200g)'],
            dairy_others: ['Yogurt (2 kg)', 'Almond milk (1L)', 'Coconut milk (500ml)', 'Olive oil (500ml)', 'Coconut oil (500ml)', 'Dark chocolate (200g)'],
            spices: ['Turmeric', 'Coriander powder', 'Cumin powder', 'Sambar powder', 'Rasam powder', 'Mustard seeds', 'Cumin seeds', 'Fenugreek seeds', 'Lemon (10)']
        };
    }

    generatePrepChecklist() {
        return {
            sunday: ['Soak dal for sambar', 'Prepare spice powders', 'Wash vegetables', 'Boil eggs'],
            monday: ['Cook rice for 2 days', 'Prepare sambar', 'Marinate chicken'],
            tuesday: ['Prepare rasam base', 'Cook dal curry', 'Prep vegetables', 'Make dosa batter'],
            wednesday: ['Prepare coconut milk base', 'Cook quinoa', 'Prep fish'],
            thursday: ['Prepare kootu', 'Soak lobia', 'Make buttermilk base'],
            friday: ['Weekend meal prep', 'Make paneer dishes', 'Prep salad vegetables'],
            saturday: ['Make overnight oats', 'Cook special dishes', 'Plan next week']
        };
    }

    generateCookingChart() {
        return {
            monday: { breakfast: 'Eggs + pomegranate + nuts', lunch: 'Rice + methi dal + chicken + yogurt', dinner: 'Millet idli + fish + buttermilk' },
            tuesday: { breakfast: 'Eggs + papaya + nuts', lunch: 'Rice + curry + chicken + yogurt', dinner: 'Millet dosa + chicken + buttermilk' },
            wednesday: { breakfast: 'Eggs + apple + nuts', lunch: 'Pulses rice + chicken curry + yogurt', dinner: 'Pesarattu + vegetables + buttermilk' },
            thursday: { breakfast: 'Eggs + kiwi + nuts', lunch: 'Rice + curry + fish + salad + yogurt', dinner: 'Lobia salad + buttermilk' },
            friday: { breakfast: 'Eggs + guava + nuts', lunch: 'Quinoa kichidi + paneer + yogurt', dinner: 'Chicken salad + buttermilk' },
            saturday: { breakfast: 'Overnight oats + fruits', lunch: 'Rice + dal + fish + yogurt', dinner: 'Omelette + buttermilk' },
            sunday: { breakfast: 'Eggs + berries + nuts', lunch: 'Rice + sambar + prawns + yogurt', dinner: 'Pesarattu + vegetables + buttermilk' }
        };
    }

    previewPDF() {
        const weekDays = this.getWeekDates();
        
        let previewHTML = `
        <div class="pdf-preview-beautiful">
            <div class="preview-page">
                <h2>📄 Page 1: Cover & Overview</h2>
                <div class="preview-cover">
                    <div class="cover-header">
                        <h3>🍛 SOUTH INDIAN NUTRITION PLANNER</h3>
                        <p>Week: ${weekDays[0].dateStr} to ${weekDays[6].dateStr}</p>
                    </div>
                    <div class="couple-info">
                        <div class="person-box sethu-box">
                            <h4>👨 SETHU (HUSBAND)</h4>
                            <p>Daily Target: 1700 calories</p>
                            <p>Focus: Balanced nutrition</p>
                        </div>
                        <div class="person-box sangeetha-box">
                            <h4>👩 SANGEETHA (WIFE)</h4>
                            <p>Daily Target: 1500 calories</p>
                            <p>Focus: Weight management</p>
                        </div>
                    </div>
                    <div class="features-box">
                        <h4>🌟 WHAT'S INCLUDED</h4>
                        <ul>
                            <li>☕ Morning coffee routine for both partners</li>
                            <li>🛒 Complete weekly shopping list by categories</li>
                            <li>📋 Daily meal prep checklist and schedule</li>
                            <li>🍽️ Personalized South Indian meal plans</li>
                            <li>⚖️ Portion control guide with exact weights</li>
                            <li>💡 Nutrition tips for couples</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="preview-page">
                <h2>📄 Page 2: Shopping List</h2>
                <div class="preview-shopping">
                    <div class="shopping-categories-preview">
                        <div class="category-preview">🌾 GRAINS & STAPLES</div>
                        <div class="category-preview">🥩 PROTEINS & LEGUMES</div>
                        <div class="category-preview">🥬 VEGETABLES</div>
                        <div class="category-preview">🍎 FRUITS</div>
                        <div class="category-preview">🥛 DAIRY & BEVERAGES</div>
                        <div class="category-preview">🌶️ SPICES & CONDIMENTS</div>
                    </div>
                    <div class="shopping-tips">
                        <h4>💡 SMART SHOPPING TIPS</h4>
                        <p>• Shop early morning for fresh vegetables<br>
                        • Buy whole spices for better flavor<br>
                        • Choose seasonal fruits for nutrition<br>
                        • Stock up on dal and rice properly</p>
                    </div>
                </div>
            </div>
            
            <div class="preview-page">
                <h2>📄 Page 3: Daily Meal Plans</h2>
                <div class="preview-meals">
                    <div class="daily-schedule">
                        <h4>📅 WEEKLY MEAL SCHEDULE</h4>
                        <div class="days-preview">
                            ${weekDays.map((day, index) => `
                                <div class="day-preview" style="border-left: 4px solid ${this.getDayColor(index)}">
                                    <strong>${day.dayName.toUpperCase()}</strong>
                                    <small>${day.dateStr}</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="prep-schedule">
                        <h4>⏰ WEEKLY PREP SCHEDULE</h4>
                        <p>• SUNDAY: Wash vegetables, soak lentils<br>
                        • MONDAY: Cook rice, prepare sambar base<br>
                        • WEDNESDAY: Mid-week prep refresh<br>
                        • FRIDAY: Weekend batch cooking<br>
                        • DAILY: Morning coffee, evening buttermilk</p>
                    </div>
                    <div class="nutrition-tips">
                        <h4>💡 COUPLE NUTRITION TIPS</h4>
                        <p>☕ Start together with filter coffee<br>
                        ⚖️ Use kitchen scale for accuracy<br>
                        🚶‍♀️ Evening walks together<br>
                        💧 Drink water before meals</p>
                    </div>
                </div>
            </div>
            
            <div class="nutritionist-credit">
                <h4>👩‍⚕️ BY: ANUSHA KATTA - Certified Nutrition Consultant</h4>
                <p>Beautiful 3-page comprehensive meal planner for couples</p>
            </div>
        </div>
        `;

        document.getElementById('previewContent').innerHTML = previewHTML;
        document.getElementById('pdfPreview').style.display = 'block';
        document.getElementById('pdfPreview').scrollIntoView({ behavior: 'smooth' });
    }

    getDayColor(index) {
        const colors = ['#FF6347', '#FFA500', '#FFD700', '#32CD32', '#1E90FF', '#8A2BE2', '#FF1493'];
        return colors[index] || '#FF6347';
    }

    generateShoppingListHTML() {
        const shoppingList = this.generateShoppingList();
        let html = '<div class="preview-section"><h4>🛒 Shopping List</h4>';
        
        Object.keys(shoppingList).forEach(category => {
            html += '<div class="shopping-category"><h5>' + category.replace(/_/g, ' ').toUpperCase() + '</h5><div class="shopping-items">';
            shoppingList[category].forEach(item => {
                html += '<div class="shopping-item"><span>' + item + '</span><input type="checkbox"></div>';
            });
            html += '</div></div>';
        });
        
        return html + '</div>';
    }

    generatePrepChecklistHTML() {
        const prepList = this.generatePrepChecklist();
        let html = '<div class="preview-section"><h4>📝 Weekly Prep Checklist</h4><div class="prep-checklist">';
        
        Object.keys(prepList).forEach(day => {
            html += '<div class="prep-day"><h6>' + day.toUpperCase() + '</h6><div class="prep-tasks">';
            prepList[day].forEach(task => {
                html += '<div class="prep-task">☐ ' + task + '</div>';
            });
            html += '</div></div>';
        });
        
        return html + '</div></div>';
    }

    generateCookingChartHTML(weekDays) {
        const cookingChart = this.generateCookingChart();
        let html = '<div class="preview-section"><h4>👩‍🍳 Daily Cooking Schedule</h4><div class="cooking-schedule">';
        
        weekDays.forEach(day => {
            const dayName = day.dayName.toLowerCase();
            const meals = cookingChart[dayName];
            
            html += '<div class="cooking-day"><h6>' + day.dayName.substr(0, 3).toUpperCase() + '<br>' + day.date.getDate() + '</h6><div class="cooking-meals">';
            if (meals) {
                html += '<div class="cooking-meal"><strong>B:</strong> ' + meals.breakfast + '</div>';
                html += '<div class="cooking-meal"><strong>L:</strong> ' + meals.lunch + '</div>';
                html += '<div class="cooking-meal"><strong>D:</strong> ' + meals.dinner + '</div>';
            }
            html += '</div></div>';
        });
        
        return html + '</div></div>';
    }

    downloadPDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const weekDays = this.getWeekDates();
        
        // Create beautiful 3-page PDF
        this.createPage1_CoverAndOverview(pdf, weekDays);
        this.createPage2_ShoppingList(pdf, weekDays);
        this.createPage3_MealPlan(pdf, weekDays);
        
        // Save the PDF
        const fileName = `Beautiful-Meal-Planner-Week-${weekDays[0].dateStr.replace(/\//g, '-')}.pdf`;
        pdf.save(fileName);
        this.showNotification('Beautiful 3-page PDF downloaded successfully! 🎉', 'success');
    }

    createPage1_CoverAndOverview(pdf, weekDays) {
        // Page 1 - Cover Page & Overview
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        
        // Background gradient effect (using rectangles)
        pdf.setFillColor(255, 247, 240);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        
        pdf.setFillColor(255, 107, 53);
        pdf.rect(0, 0, pageWidth, 60, 'F');
        
        // Main Title
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(28);
        pdf.setFont('helvetica', 'bold');
        pdf.text('SOUTH INDIAN', 20, 30);
        pdf.text('NUTRITION PLANNER', 20, 45);
        
        // Subtitle
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Week: ${weekDays[0].dateStr} to ${weekDays[6].dateStr}`, 20, 55);
        
        // Beautiful decorative line
        pdf.setDrawColor(255, 107, 53);
        pdf.setLineWidth(2);
        pdf.line(20, 70, pageWidth - 20, 70);
        
        // Couple Information Section
        let yPos = 90;
        pdf.setTextColor(51, 51, 51);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('COUPLE NUTRITION PLAN', 20, yPos);
        
        yPos += 20;
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        
        // Sethu's Info Box
        pdf.setFillColor(240, 248, 255);
        pdf.setDrawColor(74, 144, 226);
        pdf.rect(20, yPos, 80, 35, 'FD');
        pdf.setTextColor(74, 144, 226);
        pdf.setFont('helvetica', 'bold');
        pdf.text('SETHU (HUSBAND)', 25, yPos + 10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(51, 51, 51);
        pdf.text('Daily Target: 1700 calories', 25, yPos + 20);
        pdf.text('Focus: Balanced nutrition', 25, yPos + 30);
        
        // Sangeetha's Info Box
        pdf.setFillColor(255, 240, 248);
        pdf.setDrawColor(226, 74, 144);
        pdf.rect(110, yPos, 80, 35, 'FD');
        pdf.setTextColor(226, 74, 144);
        pdf.setFont('helvetica', 'bold');
        pdf.text('SANGEETHA (WIFE)', 115, yPos + 10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(51, 51, 51);
        pdf.text('Daily Target: 1500 calories', 115, yPos + 20);
        pdf.text('Focus: Weight management', 115, yPos + 30);
        
        yPos += 50;
        
        // Key Features Section
        pdf.setFillColor(248, 255, 240);
        pdf.setDrawColor(46, 204, 113);
        pdf.rect(20, yPos, pageWidth - 40, 60, 'FD');
        
        pdf.setTextColor(46, 204, 113);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('WHAT\'S INCLUDED IN THIS PLANNER', 25, yPos + 15);
        
        pdf.setTextColor(51, 51, 51);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        const features = [
            '* Morning coffee routine for both partners',
            '* Complete weekly shopping list by categories',  
            '* Daily meal prep checklist and schedule',
            '* Personalized South Indian meal plans',
            '* Portion control guide with exact weights',
            '* Nutrition tips for couples'
        ];
        
        features.forEach((feature, index) => {
            pdf.text(feature, 25, yPos + 30 + (index * 8));
        });
        
        // Nutritionist Credit
        yPos = pageHeight - 40;
        pdf.setFillColor(255, 107, 53);
        pdf.rect(20, yPos, pageWidth - 40, 25, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BY: ANUSHA KATTA', 25, yPos + 10);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Certified Nutrition Consultant', 25, yPos + 20);
        
        // Footer
        pdf.setTextColor(128, 128, 128);
        pdf.setFontSize(8);
        pdf.text(`Generated: ${new Date().toLocaleDateString()} | Page 1 of 3`, 25, pageHeight - 10);
    }

    createPage2_ShoppingList(pdf, weekDays) {
        pdf.addPage();
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        
        // Page Header
        pdf.setFillColor(247, 147, 30);
        pdf.rect(0, 0, pageWidth, 40, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(22);
        pdf.setFont('helvetica', 'bold');
        pdf.text('WEEKLY SHOPPING LIST', 20, 25);
        
        let yPos = 60;
        const shoppingList = this.generateShoppingList();
        
        // Create organized shopping list by categories
        const categories = [
            { name: 'GRAINS & STAPLES', color: [139, 69, 19] },
            { name: 'PROTEINS & LEGUMES', color: [220, 20, 60] },
            { name: 'VEGETABLES', color: [34, 139, 34] },
            { name: 'FRUITS', color: [255, 140, 0] },
            { name: 'DAIRY & BEVERAGES', color: [70, 130, 180] },
            { name: 'SPICES & CONDIMENTS', color: [128, 0, 128] }
        ];
        
        categories.forEach(category => {
            if (yPos > pageHeight - 50) {
                pdf.addPage();
                yPos = 30;
            }
            
            // Category header
            pdf.setFillColor(category.color[0], category.color[1], category.color[2]);
            pdf.rect(20, yPos, pageWidth - 40, 15, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text(category.name, 25, yPos + 10);
            
            yPos += 20;
            
            // Category items
            pdf.setTextColor(51, 51, 51);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            
            const items = this.getCategoryItems(category.name.toLowerCase().replace(/[^a-z]/g, ''));
            const itemsPerRow = 2;
            let itemIndex = 0;
            
            items.forEach(item => {
                const xPos = 25 + (itemIndex % itemsPerRow) * 85;
                if (itemIndex % itemsPerRow === 0 && itemIndex > 0) yPos += 10;
                
                pdf.text(`- ${item}`, xPos, yPos);
                itemIndex++;
            });
            
            yPos += 15;
        });
        
        // Shopping Tips Box
        if (yPos > pageHeight - 80) {
            pdf.addPage();
            yPos = 30;
        }
        
        pdf.setFillColor(255, 248, 220);
        pdf.setDrawColor(255, 165, 0);
        pdf.rect(20, yPos, pageWidth - 40, 50, 'FD');
        
        pdf.setTextColor(255, 140, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('SMART SHOPPING TIPS', 25, yPos + 12);
        
        pdf.setTextColor(51, 51, 51);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const tips = [
            '* Shop early morning for fresh vegetables and best prices',
            '* Buy whole spices and grind fresh for better flavor',
            '* Choose seasonal fruits for maximum nutrition and value',
            '* Stock up on dal and rice - store in airtight containers'
        ];
        
        tips.forEach((tip, index) => {
            pdf.text(tip, 25, yPos + 25 + (index * 8));
        });
        
        // Footer
        pdf.setTextColor(128, 128, 128);
        pdf.setFontSize(8);
        pdf.text(`Week: ${weekDays[0].dateStr} to ${weekDays[6].dateStr} | Page 2 of 3`, 25, pageHeight - 10);
    }

    createPage3_MealPlan(pdf, weekDays) {
        pdf.addPage();
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        
        // Page Header
        pdf.setFillColor(46, 204, 113);
        pdf.rect(0, 0, pageWidth, 40, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(22);
        pdf.setFont('helvetica', 'bold');
        pdf.text('DAILY MEAL PLAN & PREP SCHEDULE', 20, 25);
        
        let yPos = 60;
        
        // Weekly meal schedule
        weekDays.forEach((day, index) => {
            if (yPos > pageHeight - 100) {
                pdf.addPage();
                yPos = 30;
            }
            
            // Day header
            const dayColors = [
                [255, 99, 71],   // Monday - Tomato
                [255, 165, 0],   // Tuesday - Orange
                [255, 215, 0],   // Wednesday - Gold
                [50, 205, 50],   // Thursday - Lime Green
                [30, 144, 255],  // Friday - Dodger Blue
                [138, 43, 226],  // Saturday - Blue Violet
                [255, 20, 147]   // Sunday - Deep Pink
            ];
            
            pdf.setFillColor(dayColors[index][0], dayColors[index][1], dayColors[index][2]);
            pdf.rect(20, yPos, pageWidth - 40, 15, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${day.dayName.toUpperCase()} - ${day.dateStr}`, 25, yPos + 10);
            
            yPos += 20;
            
            // Meal plan for the day
            pdf.setTextColor(51, 51, 51);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            
            const meals = this.getDayMealPlan(day.dayName);
            meals.forEach(meal => {
                pdf.setFont('helvetica', 'bold');
                pdf.text(`${meal.time} ${meal.name}:`, 25, yPos);
                pdf.setFont('helvetica', 'normal');
                const lines = pdf.splitTextToSize(meal.description, pageWidth - 100);
                pdf.text(lines, 70, yPos);
                yPos += Math.max(lines.length * 4, 8);
            });
            
            yPos += 10;
        });
        
        // Prep Schedule Box
        if (yPos > pageHeight - 120) {
            pdf.addPage();
            yPos = 30;
        }
        
        pdf.setFillColor(240, 248, 255);
        pdf.setDrawColor(30, 144, 255);
        pdf.rect(20, yPos, pageWidth - 40, 80, 'FD');
        
        pdf.setTextColor(30, 144, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('WEEKLY PREP SCHEDULE', 25, yPos + 15);
        
        pdf.setTextColor(51, 51, 51);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        
        const prepTasks = [
            'SUNDAY: Wash and chop vegetables, soak lentils, prepare spice mixes',
            'MONDAY: Cook rice for 2 days, prepare sambar base, boil eggs',
            'WEDNESDAY: Mid-week prep - refresh vegetables, prepare curry base',
            'FRIDAY: Weekend prep - make larger batches, prepare snack items',
            'DAILY: Morning coffee setup, evening buttermilk preparation'
        ];
        
        prepTasks.forEach((task, index) => {
            pdf.text(`* ${task}`, 25, yPos + 30 + (index * 10));
        });
        
        // Nutrition Tips
        yPos += 100;
        if (yPos > pageHeight - 60) {
            pdf.addPage();
            yPos = 30;
        }
        
        pdf.setFillColor(255, 248, 220);
        pdf.setDrawColor(255, 140, 0);
        pdf.rect(20, yPos, pageWidth - 40, 45, 'FD');
        
        pdf.setTextColor(255, 140, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('COUPLE NUTRITION TIPS', 25, yPos + 12);
        
        pdf.setTextColor(51, 51, 51);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        
        const nutritionTips = [
            '* Start each day together with filter coffee for bonding',
            '* Use kitchen scale for accurate portion control',
            '* Take evening walks together after dinner',
            '* Drink water 30 minutes before meals for better digestion'
        ];
        
        nutritionTips.forEach((tip, index) => {
            pdf.text(tip, 25, yPos + 25 + (index * 8));
        });
        
        // Final Footer
        pdf.setTextColor(128, 128, 128);
        pdf.setFontSize(8);
        pdf.text(`Complete Meal Planner for Sethu & Sangeetha | Page 3 of 3`, 25, pageHeight - 10);
    }

    getCategoryItems(categoryName) {
        const itemsMap = {
            'grains': ['Basmati Rice (2kg)', 'Brown Rice (1kg)', 'Idli Rice (1kg)', 'Rava/Semolina (500g)', 'Wheat Flour (1kg)'],
            'proteins': ['Toor Dal (1kg)', 'Moong Dal (500g)', 'Chana Dal (500g)', 'Chicken Breast (1kg)', 'Eggs (30 pieces)', 'Paneer (500g)'],
            'vegetables': ['Onions (2kg)', 'Tomatoes (1kg)', 'Green Chilies (250g)', 'Ginger (200g)', 'Curry Leaves', 'Coriander Leaves', 'Drumsticks', 'Okra (500g)', 'Brinjal (500g)'],
            'fruits': ['Pomegranate (4 pieces)', 'Papaya (1 large)', 'Apples (1kg)', 'Guava (500g)', 'Mixed Berries (500g)', 'Kiwi (6 pieces)'],
            'dairy': ['Milk (3 liters)', 'Curd (1kg)', 'Coffee Powder (200g)', 'Tea Leaves (100g)', 'Buttermilk', 'Coconut (2 pieces)'],
            'spices': ['Turmeric Powder', 'Red Chili Powder', 'Coriander Powder', 'Cumin Seeds', 'Mustard Seeds', 'Fenugreek Seeds', 'Tamarind', 'Sambar Powder', 'Rasam Powder']
        };
        
        return itemsMap[categoryName] || ['Basic items for this category'];
    }

    getDayMealPlan(dayName) {
        const mealPlans = {
            'Monday': [
                { time: '6:00 AM', name: 'Coffee', description: 'Filter coffee for both - start the day together' },
                { time: '9:00 AM', name: 'Breakfast', description: 'Sethu: 4 egg whites + pomegranate + nuts | Sangeetha: 3 egg whites + pomegranate + nuts' },
                { time: '1:00 PM', name: 'Lunch', description: 'Rice + methi dal + vegetables + chicken breast + yogurt (portions as per targets)' },
                { time: '4:00 PM', name: 'Snack', description: 'Seasonal fruit + nuts or evening tea' },
                { time: '7:00 PM', name: 'Dinner', description: 'Light meal with proteins + vegetables + minimal carbs' }
            ],
            'Tuesday': [
                { time: '6:00 AM', name: 'Coffee', description: 'Filter coffee ritual together' },
                { time: '9:00 AM', name: 'Breakfast', description: 'Egg whites + papaya + nuts (different portions for each)' },
                { time: '1:00 PM', name: 'Lunch', description: 'Rice + sambar + vegetable curry + protein + yogurt' },
                { time: '4:00 PM', name: 'Snack', description: 'Buttermilk + light snack' },
                { time: '7:00 PM', name: 'Dinner', description: 'Vegetable-focused meal with minimal rice' }
            ],
            'Wednesday': [
                { time: '6:00 AM', name: 'Coffee', description: 'Morning coffee together' },
                { time: '9:00 AM', name: 'Breakfast', description: 'Egg whites + apple + nuts mix' },
                { time: '1:00 PM', name: 'Lunch', description: 'Rice + rasam + dal + vegetables + protein' },
                { time: '4:00 PM', name: 'Snack', description: 'Coconut water + almonds' },
                { time: '7:00 PM', name: 'Dinner', description: 'Light dinner focusing on proteins and vegetables' }
            ],
            'Thursday': [
                { time: '6:00 AM', name: 'Coffee', description: 'Filter coffee time' },
                { time: '9:00 AM', name: 'Breakfast', description: 'Egg whites + kiwi + mixed nuts' },
                { time: '1:00 PM', name: 'Lunch', description: 'Rice + curry + dal + vegetables + protein source' },
                { time: '4:00 PM', name: 'Snack', description: 'Green tea + light evening snack' },
                { time: '7:00 PM', name: 'Dinner', description: 'Balanced dinner with controlled portions' }
            ],
            'Friday': [
                { time: '6:00 AM', name: 'Coffee', description: 'Morning coffee ritual' },
                { time: '9:00 AM', name: 'Breakfast', description: 'Egg whites + guava + nuts and seeds' },
                { time: '1:00 PM', name: 'Lunch', description: 'Special Friday meal - rice + fish curry + vegetables' },
                { time: '4:00 PM', name: 'Snack', description: 'Fresh fruit juice + nuts' },
                { time: '7:00 PM', name: 'Dinner', description: 'Light protein-rich dinner' }
            ],
            'Saturday': [
                { time: '6:00 AM', name: 'Coffee', description: 'Weekend coffee together' },
                { time: '9:00 AM', name: 'Breakfast', description: 'Overnight oats + fruits + nuts (weekend special)' },
                { time: '1:00 PM', name: 'Lunch', description: 'Traditional South Indian feast (controlled portions)' },
                { time: '4:00 PM', name: 'Snack', description: 'Traditional drink like panakam + snacks' },
                { time: '7:00 PM', name: 'Dinner', description: 'Early light dinner before weekend activities' }
            ],
            'Sunday': [
                { time: '6:00 AM', name: 'Coffee', description: 'Relaxed Sunday coffee time' },
                { time: '9:00 AM', name: 'Breakfast', description: 'Egg whites + mixed berries + nuts' },
                { time: '1:00 PM', name: 'Lunch', description: 'Sunday special - variety rice + curries + proteins' },
                { time: '4:00 PM', name: 'Snack', description: 'Badam milk + evening snacks' },
                { time: '7:00 PM', name: 'Dinner', description: 'Light Sunday dinner to prepare for the week' }
            ]
        };
        
        return mealPlans[dayName] || mealPlans['Monday'];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.nutritionCalc = new NutritionCalculator();
});

// Add keyboard shortcuts for better UX
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                window.nutritionCalc.switchUser(1);
                break;
            case '2':
                e.preventDefault();
                window.nutritionCalc.switchUser(2);
                break;
            case 'k':
                e.preventDefault();
                document.getElementById('foodSearch').focus();
                break;
        }
    }
});