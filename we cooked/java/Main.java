import java.util.ArrayList;
import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

/**
 * A simple console-based inventory manager for computer parts.
 * <p>
 * This program stores items in a {@code List} of {@code Map<String, String>}
 * where each map holds the item's {@code name} and {@code price}. It provides
 * a text menu to view the current inventory, add new items, or exit.
 * </p>
 */
public class Main {

    /**
     * In-memory storage for all inventory items.
     * <p>
     * Each entry is a {@code HashMap} with two keys:
     * <ul>
     *   <li>{@code "name"}  – the product name (e.g. "Intel Core i7")</li>
     *   <li>{@code "price"} – the price as a plain string (e.g. "$10")</li>
     * </ul>
     * Using a {@code List} preserves insertion order so the inventory is
     * displayed in the same order items were added.
     * </p>
     */
    private static final List<Map<String, String>> inventory = new ArrayList<>();

    /**
     * Entry point of the application.
     *
     * @param args command-line arguments (not used)
     */
    public static void main(final String[] args) {
        // Pre-fill the inventory with a few sample computer components
        // so the user has something to look at on the first run.
        addSampleData();

        // Try-with-resources guarantees the Scanner (and therefore System.in)
        // is closed automatically when the program finishes, even if an
        // unexpected error occurs.
        try (final Scanner scanner = new Scanner(System.in)) {

            // Infinite loop keeps the menu running until the user chooses Exit.
            while (true) {
                // Print the menu options.
                System.out.println("=== Computer Parts Inventory ===");
                System.out.println("1. View Inventory");
                System.out.println("2. Add Item");
                System.out.println("3. Exit");
                System.out.print("Choose option: ");

                int choice;
                try {
                    // nextInt() reads the integer but leaves the newline
                    // character (\n) in the input buffer.
                    choice = scanner.nextInt();
                    // Consume the leftover newline so the next nextLine()
                    // call reads actual user data instead of the empty string.
                    scanner.nextLine();
                } catch (final InputMismatchException e) {
                    // If the user typed letters or symbols instead of a number,
                    // nextInt() throws InputMismatchException.
                    System.out.println("Invalid input. Please enter a number.");
                    scanner.nextLine(); // clear the invalid token from the buffer
                    continue;           // go back to the top of the loop
                }

                // Execute the action that matches the user's choice.
                switch (choice) {
                    case 1 -> viewInventory();
                    case 2 -> addItem(scanner);
                    case 3 -> {
                        System.out.println("Goodbye!");
                        // The try-with-resources block will close the scanner
                        // automatically when we return from main().
                        return;
                    }
                    default -> // Any integer other than 1, 2, or 3 is rejected.
                        System.out.println("Invalid choice. Try again.");
                }

                // Blank line between iterations for cleaner console output.
                System.out.println();
            }
        }
    }

    /**
     * Populates the {@code inventory} list with six hard-coded sample items.
     * <p>
     * This method is called once at startup so the inventory is not empty
     * when the program first runs.
     * </p>
     */
    private static void addSampleData() {
        final Map<String, String> item1 = new HashMap<>();
        item1.put("name", "Intel Core i7");
        item1.put("price", "$10");
        inventory.add(item1);

        final Map<String, String> item2 = new HashMap<>();
        item2.put("name", "NVIDIA RTX 4090 GPU");
        item2.put("price", "$1600");
        inventory.add(item2);

        final Map<String, String> item3 = new HashMap<>();
        item3.put("name", "Corsair Vengeance DDR4 RAM 32GB");
        item3.put("price", "$120");
        inventory.add(item3);

        final Map<String, String> item4 = new HashMap<>();
        item4.put("name", "Samsung 990 Pro 1TB M.2 SSD");
        item4.put("price", "$100");
        inventory.add(item4);

        final Map<String, String> item5 = new HashMap<>();
        item5.put("name", "WD Green 1TB HDD");
        item5.put("price", "$50");
        inventory.add(item5);

        final Map<String, String> item6 = new HashMap<>();
        item6.put("name", "Logitech Webcam");
        item6.put("price", "$80");
        inventory.add(item6);
    }

    /**
     * Displays every item currently stored in the {@code inventory} list.
     * <p>
     * If the list is empty, a friendly message is shown instead.
     * Each item is printed with a 1-based index, its name, and its price.
     * </p>
     */
    private static void viewInventory() {
        if (inventory.isEmpty()) {
            System.out.println("Inventory is empty.");
            return;
        }

        System.out.println("\nCurrent Inventory:");
        // Loop through the list using a classic for-loop so we can print
        // a human-friendly 1-based index (i+1) alongside each item.
        for (int i = 0; i < inventory.size(); i++) {
            final Map<String, String> item = inventory.get(i);
            System.out.println((i + 1) + ". " + item.get("name") + " - " + item.get("price"));
        }
    }

    /**
     * Prompts the user for a name and price, validates the inputs, and
     * appends the new item to the {@code inventory} list.
     *
     * @param scanner the {@code Scanner} instance bound to {@code System.in}
     */
    private static void addItem(final Scanner scanner) {
        System.out.print("Item name: ");
        // nextLine() reads the entire line the user typed.
        final String name = scanner.nextLine().trim();

        // Reject blank names to keep the inventory clean.
        if (name.isEmpty()) {
            System.out.println("Item name cannot be empty.");
            return;
        }

        System.out.print("Price: ");
        final String price = scanner.nextLine().trim();

        // Reject blank prices as well.
        if (price.isEmpty()) {
            System.out.println("Price cannot be empty.");
            return;
        }

        // Build a new map for this item and store it in the shared list.
        final Map<String, String> item = new HashMap<>();
        item.put("name", name);
        item.put("price", price);
        inventory.add(item);

        System.out.println("Item added!");
    }
}

