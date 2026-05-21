# MessMate AI - Smart Mess Decision Agent

A beginner-friendly web application that simulates an AI agent to help users decide where to eat based on budget, diet preference, and time of day.

## Features

- **Today's AI Decision**: Automatically shows a recommendation without user input
- **Smart Filtering**: Filters mess options based on keywords (cheap, veg, non-veg, fast)
- **Intelligence Features**:
  - Crowd prediction based on time (lunch = high crowd)
  - Delivery status (high time = late delivery)
  - Food suggestion based on time of day (morning = breakfast, afternoon = meals, night = dinner)
- **Availability Status**: Shows Available or Sold Out for each mess
- **Warnings**: Displays "Almost Sold Out" alerts for low quantity items
- **Rating-based Selection**: Selects the best option based on rating

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- JavaScript (no TypeScript)
- Static JSON data (no database)
- No external APIs

## Project Structure

```
messaipro/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Main page with UI
│   └── globals.css        # Global styles
├── data/
│   └── messData.json      # Static mess data
├── lib/
│   └── agent.js           # AI agent logic
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and visit: `http://localhost:3000`

## How to Use

### Automatic Recommendation
- The app automatically shows "Today's AI Decision" when you load the page
- This recommendation is based on the current time of day and best-rated available mess

### Manual Search
- Use the input box to ask questions like:
  - "I want cheap veg food"
  - "fast non-veg option"
  - "affordable mess"
  - "quick delivery"

### Available Keywords
- **cheap/budget/affordable**: Filters messes with price ≤ ₹70
- **veg/vegetarian**: Shows only vegetarian options
- **non-veg/non veg/nonveg**: Shows only non-vegetarian options
- **fast/quick/speed**: Shows messes with delivery time ≤ 15 minutes

### Mess Information Display
Each mess card shows:
- Name and availability status (Available/Sold Out)
- Price, rating, type (veg/non-veg)
- Delivery time
- Crowd level (low/medium/high)
- Delivery status (fast/normal/late)
- Quantity left
- Warning if almost sold out (≤ 10 items)

## Data Structure

The mess data (`data/messData.json`) includes:
- `id`: Unique identifier
- `name`: Mess name
- `price`: Price in rupees
- `rating`: Rating out of 5
- `type`: "veg" or "non-veg"
- `deliveryTime`: Delivery time in minutes
- `quantityLeft`: Available quantity (0 = sold out)

## Agent Logic

The agent function (`lib/agent.js`):
1. Gets current time of day
2. Predicts crowd level based on time
3. Determines food suggestion (breakfast/meals/dinner)
4. Detects keywords from user input
5. Filters mess data based on keywords
6. Removes sold-out items (quantityLeft = 0)
7. Sorts by rating (highest first)
8. Selects best option
9. Adds intelligence data (crowd, delivery status, warnings)

## Customization

### Add New Mess Options
Edit `data/messData.json` and add new mess objects following the existing structure.

### Modify Intelligence Logic
Edit `lib/agent.js` to change:
- Time-based crowd prediction
- Delivery time thresholds
- Food suggestion logic
- Keyword detection patterns

### Change Styling
Edit `app/page.js` to modify Tailwind CSS classes for different styling.

## Beginner-Friendly Features

- Simple, clean code structure
- No complex backend or database
- Easy to understand logic
- Clear comments in code
- Modular design (separate data, logic, and UI)
- Uses familiar JavaScript patterns

## License

This is a beginner learning project. Feel free to modify and use it for learning purposes.
