# Contribution Guide for Productivity Hub Monorepo

Welcome to the Productivity Hub monorepo! This guide outlines how contributors can work on features, install packages, and utilize the shared `ui` package effectively.

## Prerequisites

Before contributing, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **pnpm** (v8 or higher)
- **Turbo Repo** (comes pre-configured in this workspace)

## Setting Up the Workspace

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/productivity-hub.git
    cd productivity-hub
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Build the workspace:
    ```bash
    pnpm build
    ```

## Adding Dependencies to a Feature

Each feature is located in the `packages/` directory. To add dependencies to a specific feature:

1. Navigate to the feature directory:

    ```bash
    cd packages/feature-auth
    ```

2. Add the dependency:

    ```bash
    pnpm add <package-name> --filter=<your feature name> (e.g @workspace/feature-auth)
    ```

## Using the Shared `ui` Package

The shared `ui` package contains reusable components and styles. To use it in your feature:

1. Import the component:

    ```tsx
    import { Button } from "@workspace/ui/components/button";
    ```

2. Use the component in your feature's code:
    ```tsx
    export default function ExamplePage() {
    	return (
    		<div>
    			<Button>Click Me</Button>
    		</div>
    	);
    }
    ```

## Adding New Components to the `ui` Package

If you need a new shared component:

1. Navigate to the `ui` package:

    ```bash
    cd packages/ui
    ```

2. Create the component in the `src/components` directory:

    ```tsx
    // filepath: packages/ui/src/components/MyComponent.tsx
    export function MyComponent() {
    	return <div>My Shared Component</div>;
    }
    ```

3. Export the component in `src/index.ts`:

    ```tsx
    export { MyComponent } from "./components/MyComponent";
    ```

4. Build the `ui` package:
    ```bash
    pnpm build
    ```

## Testing Your Changes

1. Run the development server for the `web` app:

    ```bash
    pnpm dev -c apps/web
    ```

2. Verify your changes in the browser.

## Submitting Changes

1. Create a new branch for your feature:

    ```bash
    git checkout -b feature/<feature-name>
    ```

2. Commit your changes:

    ```bash
    git commit -m "Add <feature-name>"
    ```

3. Push your branch:

    ```bash
    git push origin feature/<feature-name>
    ```

4. Open a pull request on GitHub.

## Additional Notes

- Follow the coding standards defined in the `.eslintrc.js` file.
- Use TypeScript for all new code.
- Ensure your feature is properly scoped and does not introduce breaking changes to shared packages.

Happy coding!
