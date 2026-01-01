---
title: "E2E Testing with Cypress"
description: "Writing robust end-to-end tests for modern web applications. Best practices for selecting elements and handling async operations."
excerpt: "Writing robust end-to-end tests for modern web applications. Best practices for selecting elements and handling async operations."
category: "QA"
pubDate: "2023-10-10"
readTime: "7 min read"
image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz5-An-IQPz88m2jgxF-i-F1OzamJ0uMf7uN7VvQ76DjbcLFqMJeH-yiPpB7ilE6xJkwbE1QWSBbJJsUYNtTup4AKyM-NFqqvfu3gNhQssxiu1Gx6-8AO3HIfqnAigyLwI4A7NSUKtAk3mOVpgNKw8N7Bjn4_p6EJJfdHNyrLIlpAUQSCszRREI2A8TJ0GCV-k8TH6caqZdrXeNSEoHLjIW5LdvAjU2U6irGr6aVnCXW_uqnHWjSWr-yU0EI-TJSTEtV3O9HtIxziu"
---

# E2E Testing with Cypress

End-to-end testing is crucial for ensuring your web applications work correctly from the user's perspective. Cypress has revolutionized E2E testing with its developer-friendly approach and powerful debugging capabilities.

## Why Cypress?

Cypress stands out from other testing frameworks because it:

- **Runs in the browser**: Tests execute in the same run loop as your application
- **Real-time reloads**: Automatically reloads tests when you save changes
- **Time travel**: Debug by hovering over commands in the test runner
- **Automatic waiting**: No need for explicit waits or sleeps
- **Network stubbing**: Mock API responses easily

## Getting Started

### Installation
```bash
npm install --save-dev cypress

# Open Cypress for the first time
npx cypress open
```

### Basic Configuration
```javascript
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
```

## Writing Your First Test

### Basic Test Structure
```javascript
// cypress/e2e/login.cy.js
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should login with valid credentials', () => {
    cy.get('[data-cy=email-input]').type('user@example.com')
    cy.get('[data-cy=password-input]').type('password123')
    cy.get('[data-cy=login-button]').click()
    
    cy.url().should('include', '/dashboard')
    cy.get('[data-cy=welcome-message]').should('contain', 'Welcome back')
  })

  it('should show error with invalid credentials', () => {
    cy.get('[data-cy=email-input]').type('invalid@example.com')
    cy.get('[data-cy=password-input]').type('wrongpassword')
    cy.get('[data-cy=login-button]').click()
    
    cy.get('[data-cy=error-message]')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })
})
```

## Best Practices for Element Selection

### 1. Use Data Attributes
```html
<!-- Good: Use data-cy attributes -->
<button data-cy="submit-button">Submit</button>
<input data-cy="email-input" type="email" />

<!-- Avoid: Relying on classes or IDs that might change -->
<button class="btn btn-primary" id="submit-btn">Submit</button>
```

```javascript
// Test using data attributes
cy.get('[data-cy=submit-button]').click()
cy.get('[data-cy=email-input]').type('test@example.com')
```

### 2. Create Custom Commands
```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)
  cy.get('[data-cy=login-button]').click()
})

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy=${selector}]`)
})

// Usage in tests
cy.login('user@example.com', 'password123')
cy.getByDataCy('welcome-message').should('be.visible')
```

### 3. Page Object Model
```javascript
// cypress/support/pages/LoginPage.js
class LoginPage {
  visit() {
    cy.visit('/login')
  }

  fillEmail(email) {
    cy.get('[data-cy=email-input]').type(email)
    return this
  }

  fillPassword(password) {
    cy.get('[data-cy=password-input]').type(password)
    return this
  }

  submit() {
    cy.get('[data-cy=login-button]').click()
    return this
  }

  getErrorMessage() {
    return cy.get('[data-cy=error-message]')
  }
}

export default LoginPage

// Usage in test
import LoginPage from '../support/pages/LoginPage'

const loginPage = new LoginPage()

it('should login successfully', () => {
  loginPage
    .visit()
    .fillEmail('user@example.com')
    .fillPassword('password123')
    .submit()
    
  cy.url().should('include', '/dashboard')
})
```

## Handling Async Operations

### 1. Automatic Waiting
```javascript
// Cypress automatically waits for elements to appear
cy.get('[data-cy=loading-spinner]').should('not.exist')
cy.get('[data-cy=data-table]').should('be.visible')

// Wait for API calls to complete
cy.intercept('GET', '/api/users').as('getUsers')
cy.get('[data-cy=load-users-button]').click()
cy.wait('@getUsers')
cy.get('[data-cy=user-list]').should('contain', 'John Doe')
```

### 2. Custom Waiting Strategies
```javascript
// Wait for specific conditions
cy.get('[data-cy=status]').should('contain', 'Complete')

// Wait with timeout
cy.get('[data-cy=slow-element]', { timeout: 10000 })
  .should('be.visible')

// Wait for multiple conditions
cy.get('[data-cy=form]').within(() => {
  cy.get('[data-cy=name-input]').should('be.visible')
  cy.get('[data-cy=email-input]').should('be.visible')
  cy.get('[data-cy=submit-button]').should('not.be.disabled')
})
```

## Network Stubbing and Mocking

### 1. Intercepting API Calls
```javascript
describe('User Management', () => {
  beforeEach(() => {
    // Intercept and stub API responses
    cy.intercept('GET', '/api/users', {
      fixture: 'users.json'
    }).as('getUsers')
    
    cy.intercept('POST', '/api/users', {
      statusCode: 201,
      body: { id: 123, name: 'New User', email: 'new@example.com' }
    }).as('createUser')
  })

  it('should display users from API', () => {
    cy.visit('/users')
    cy.wait('@getUsers')
    
    cy.get('[data-cy=user-list]')
      .should('contain', 'John Doe')
      .and('contain', 'Jane Smith')
  })

  it('should create new user', () => {
    cy.visit('/users/new')
    
    cy.get('[data-cy=name-input]').type('New User')
    cy.get('[data-cy=email-input]').type('new@example.com')
    cy.get('[data-cy=submit-button]').click()
    
    cy.wait('@createUser')
    cy.get('[data-cy=success-message]').should('be.visible')
  })
})
```

### 2. Dynamic Response Handling
```javascript
// cypress/fixtures/users.json
[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
]

// Test with dynamic responses
cy.intercept('GET', '/api/users', (req) => {
  if (req.query.role === 'admin') {
    req.reply({ fixture: 'admin-users.json' })
  } else {
    req.reply({ fixture: 'regular-users.json' })
  }
}).as('getUsers')
```

## Advanced Testing Patterns

### 1. Testing File Uploads
```javascript
it('should upload file successfully', () => {
  cy.get('[data-cy=file-input]').selectFile('cypress/fixtures/sample.pdf')
  cy.get('[data-cy=upload-button]').click()
  
  cy.get('[data-cy=upload-progress]').should('be.visible')
  cy.get('[data-cy=upload-success]').should('contain', 'File uploaded successfully')
})

// Testing drag and drop
it('should handle drag and drop upload', () => {
  cy.get('[data-cy=drop-zone]').selectFile('cypress/fixtures/image.png', {
    action: 'drag-drop'
  })
  
  cy.get('[data-cy=preview-image]').should('be.visible')
})
```

### 2. Testing Forms with Validation
```javascript
describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should validate required fields', () => {
    cy.get('[data-cy=submit-button]').click()
    
    cy.get('[data-cy=name-error]').should('contain', 'Name is required')
    cy.get('[data-cy=email-error]').should('contain', 'Email is required')
    cy.get('[data-cy=message-error]').should('contain', 'Message is required')
  })

  it('should validate email format', () => {
    cy.get('[data-cy=email-input]').type('invalid-email')
    cy.get('[data-cy=submit-button]').click()
    
    cy.get('[data-cy=email-error]').should('contain', 'Please enter a valid email')
  })

  it('should submit form with valid data', () => {
    cy.get('[data-cy=name-input]').type('John Doe')
    cy.get('[data-cy=email-input]').type('john@example.com')
    cy.get('[data-cy=message-input]').type('Hello, this is a test message.')
    
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true }
    }).as('submitForm')
    
    cy.get('[data-cy=submit-button]').click()
    
    cy.wait('@submitForm')
    cy.get('[data-cy=success-message]').should('be.visible')
  })
})
```

### 3. Testing Authentication Flows
```javascript
describe('Authentication', () => {
  it('should handle complete auth flow', () => {
    // Login
    cy.visit('/login')
    cy.login('user@example.com', 'password123')
    
    // Verify authenticated state
    cy.getCookie('auth-token').should('exist')
    cy.get('[data-cy=user-menu]').should('be.visible')
    
    // Access protected route
    cy.visit('/profile')
    cy.get('[data-cy=profile-form]').should('be.visible')
    
    // Logout
    cy.get('[data-cy=user-menu]').click()
    cy.get('[data-cy=logout-button]').click()
    
    // Verify logged out state
    cy.getCookie('auth-token').should('not.exist')
    cy.url().should('include', '/login')
  })

  it('should redirect unauthenticated users', () => {
    cy.visit('/profile')
    cy.url().should('include', '/login')
    cy.get('[data-cy=login-required-message]').should('be.visible')
  })
})
```

## Testing Mobile Responsiveness

```javascript
describe('Mobile Responsiveness', () => {
  const sizes = [
    [320, 568], // iPhone SE
    [375, 667], // iPhone 8
    [414, 896], // iPhone XR
    [768, 1024] // iPad
  ]

  sizes.forEach((size) => {
    it(`should work on ${size[0]}x${size[1]} screen`, () => {
      cy.viewport(size[0], size[1])
      cy.visit('/')
      
      cy.get('[data-cy=mobile-menu-button]').should('be.visible')
      cy.get('[data-cy=desktop-navigation]').should('not.be.visible')
      
      // Test mobile menu
      cy.get('[data-cy=mobile-menu-button]').click()
      cy.get('[data-cy=mobile-menu]').should('be.visible')
    })
  })
})
```

## CI/CD Integration

### 1. GitHub Actions
```yaml
# .github/workflows/cypress.yml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start application
        run: npm start &
        
      - name: Wait for server
        run: npx wait-on http://localhost:3000
      
      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          wait-on: 'http://localhost:3000'
          browser: chrome
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

### 2. Docker Integration
```dockerfile
# Dockerfile.cypress
FROM cypress/included:12.7.0

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "cypress", "run"]
```

## Performance Testing

```javascript
describe('Performance Tests', () => {
  it('should load page within acceptable time', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('start')
      },
      onLoad: (win) => {
        win.performance.mark('end')
        win.performance.measure('pageLoad', 'start', 'end')
        const measure = win.performance.getEntriesByName('pageLoad')[0]
        expect(measure.duration).to.be.lessThan(3000) // 3 seconds
      }
    })
  })

  it('should handle large datasets efficiently', () => {
    cy.intercept('GET', '/api/large-dataset', {
      fixture: 'large-dataset.json'
    }).as('getLargeDataset')
    
    cy.visit('/data-table')
    cy.wait('@getLargeDataset')
    
    // Measure rendering time
    cy.window().then((win) => {
      const start = win.performance.now()
      cy.get('[data-cy=data-table]').should('be.visible').then(() => {
        const end = win.performance.now()
        expect(end - start).to.be.lessThan(1000) // 1 second
      })
    })
  })
})
```

## Debugging Tips

### 1. Using cy.debug()
```javascript
it('should debug test execution', () => {
  cy.visit('/login')
  cy.get('[data-cy=email-input]').type('user@example.com')
  cy.debug() // Pauses execution and opens DevTools
  cy.get('[data-cy=password-input]').type('password123')
})
```

### 2. Screenshots and Videos
```javascript
// Take screenshot on demand
cy.screenshot('login-page')

// Take screenshot of specific element
cy.get('[data-cy=error-message]').screenshot('error-state')
```

### 3. Console Logging
```javascript
it('should log application state', () => {
  cy.visit('/dashboard')
  
  cy.window().then((win) => {
    console.log('Application state:', win.appState)
  })
  
  cy.get('[data-cy=user-data]').then(($el) => {
    console.log('User data:', $el.text())
  })
})
```

## Conclusion

Cypress provides a powerful and developer-friendly approach to E2E testing. Key takeaways:

- **Use data attributes** for reliable element selection
- **Leverage automatic waiting** instead of explicit waits
- **Mock network requests** for consistent test environments
- **Create reusable commands** and page objects
- **Integrate with CI/CD** for automated testing
- **Focus on user workflows** rather than implementation details

Start with simple tests and gradually build more complex scenarios. The investment in E2E testing pays dividends in application reliability and user satisfaction.