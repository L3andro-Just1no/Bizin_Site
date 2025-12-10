# WordPress Integration Testing Guide

This guide will help you test the WordPress integration with your Next.js application.

## Prerequisites

Before testing, ensure:

1. WordPress is installed and accessible
2. `.env.local` file is configured with correct WordPress URLs
3. Next.js development server is running (`npm run dev`)

## Step 1: Verify WordPress API Access

### Test WordPress REST API

Open your browser or use curl to test these endpoints:

```bash
# Get all posts
curl http://localhost/wordpress/wp-json/wp/v2/posts

# Get categories
curl http://localhost/wordpress/wp-json/wp/v2/categories

# Get a specific post (replace 1 with actual post ID)
curl http://localhost/wordpress/wp-json/wp/v2/posts/1
```

**Expected Response:** JSON data with posts/categories (or empty array if no content exists)

**If you get an error:**
- Check WordPress installation
- Verify permalink settings (must be "Post name" or similar)
- Check CORS configuration in `wp-config.php`

## Step 2: Create Sample Blog Posts

### Login to WordPress Admin

1. Navigate to: `http://localhost/wordpress/wp-admin`
2. Login with your admin credentials

### Create Categories

Go to **Posts → Categories** and create these categories:

1. **Fundos Europeus** (slug: `fundos-europeus`)
2. **Incentivos** (slug: `incentivos`)
3. **Consultoria** (slug: `consultoria`)
4. **Guias** (slug: `guias`)

### Create Sample Posts

Create at least 3-5 blog posts with the following structure:

#### Sample Post 1: European Funds

**Title:** Como Aceder aos Fundos Europeus em 2024

**Content:**
```
Os fundos europeus representam uma oportunidade única para empresas portuguesas expandirem os seus negócios e investirem em inovação.

## O que são Fundos Europeus?

Os fundos europeus são instrumentos financeiros disponibilizados pela União Europeia para apoiar o desenvolvimento económico e social dos seus Estados-Membros.

## Principais Programas Disponíveis

### Portugal 2030
O Portugal 2030 é o principal programa de fundos europeus para o período 2021-2027, com um orçamento de mais de 20 mil milhões de euros.

### Horizonte Europa
Focado em investigação e inovação, este programa oferece financiamento para projetos de I&D.

## Como Candidatar-se

1. Identifique o programa adequado ao seu projeto
2. Prepare a documentação necessária
3. Submeta a candidatura no portal oficial
4. Aguarde a avaliação

## Conclusão

Os fundos europeus são essenciais para o crescimento das empresas portuguesas. Contacte-nos para saber como podemos ajudar.
```

**Category:** Fundos Europeus  
**Featured Image:** Upload or use a business-related image  
**Excerpt:** Descubra como a sua empresa pode beneficiar dos fundos europeus disponíveis em 2024.

#### Sample Post 2: Tax Incentives

**Title:** SIFIDE II: Incentivos Fiscais à I&D

**Content:**
```
O Sistema de Incentivos Fiscais em Investigação e Desenvolvimento Empresarial (SIFIDE II) é um dos principais instrumentos de apoio fiscal à inovação em Portugal.

## O que é o SIFIDE II?

O SIFIDE II permite às empresas deduzir uma parte significativa dos seus investimentos em I&D no IRC.

## Benefícios Fiscais

- Dedução de 32,5% das despesas em I&D
- Acréscimo de 15% para despesas acima da média dos últimos 2 anos
- Majoração de 15% para contratação de doutorados

## Despesas Elegíveis

As despesas elegíveis incluem:
- Salários de investigadores
- Equipamento científico
- Materiais e consumíveis
- Consultoria técnica

## Como Beneficiar

Para beneficiar do SIFIDE II, é necessário:
1. Realizar atividades de I&D qualificadas
2. Manter contabilidade organizada
3. Submeter a candidatura até 30 de junho

Contacte a nossa equipa para uma análise personalizada.
```

**Category:** Incentivos  
**Featured Image:** Technology/innovation image  
**Excerpt:** Saiba como reduzir a sua carga fiscal através do SIFIDE II.

#### Sample Post 3: Business Guide

**Title:** Guia Completo para Startups em Portugal

**Content:**
```
Criar uma startup em Portugal nunca foi tão atrativo. Este guia apresenta os passos essenciais e os apoios disponíveis.

## Passos para Criar uma Startup

### 1. Validação da Ideia
Antes de investir recursos, valide a sua ideia de negócio junto do mercado.

### 2. Estrutura Legal
Escolha a forma jurídica adequada (Unipessoal, Lda, SA).

### 3. Financiamento Inicial
Explore as opções de financiamento:
- Bootstrap
- Business Angels
- Capital de Risco
- Fundos Europeus

## Apoios Disponíveis

### Startup Portugal
A iniciativa Startup Portugal oferece vários programas de apoio.

### Incubadoras
Portugal tem excelentes incubadoras que oferecem:
- Espaço de trabalho
- Mentoria
- Networking
- Acesso a financiamento

## Incentivos Fiscais

As startups podem beneficiar de:
- IRS Jovem
- SIFIDE II
- Benefícios fiscais à capitalização

## Conclusão

Portugal oferece um ecossistema favorável para startups. Estamos aqui para ajudar a sua empresa a crescer.
```

**Category:** Guias  
**Featured Image:** Startup/entrepreneurship image  
**Excerpt:** Tudo o que precisa saber para lançar a sua startup em Portugal.

### Post Settings

For each post, ensure:

- **Status:** Published
- **Featured Image:** Set (required for best display)
- **Excerpt:** Filled (or it will be auto-generated)
- **Categories:** At least one category selected
- **Permalink:** Clean slug (e.g., `como-aceder-fundos-europeus`)

## Step 3: Test Next.js Integration

### Test Blog List Page

1. Navigate to: `http://localhost:3000/blog`
2. Verify:
   - Posts are displayed
   - Featured images load correctly
   - Categories filter works
   - Post metadata (date, read time) is shown

### Test Individual Post Page

1. Click on a blog post
2. Navigate to: `http://localhost:3000/blog/[slug]`
3. Verify:
   - Post title and content display correctly
   - Featured image is shown
   - Formatting is preserved
   - Related posts appear at bottom
   - Breadcrumb navigation works

### Test Category Filtering

1. On `/blog`, click different category buttons
2. Verify posts filter correctly by category
3. Test "All" category shows all posts

## Step 4: Test API Functionality

### Test WordPress API Client

Create a test file to verify the API client:

```typescript
// test-wordpress.ts
import { 
  getPosts, 
  getCategories, 
  getPostBySlug,
  checkWordPressConnection 
} from './lib/wordpress';

async function testWordPress() {
  console.log('Testing WordPress connection...');
  
  const isConnected = await checkWordPressConnection();
  console.log('Connected:', isConnected);
  
  if (!isConnected) {
    console.error('Cannot connect to WordPress API');
    return;
  }
  
  console.log('\nFetching posts...');
  const posts = await getPosts();
  console.log(`Found ${posts.length} posts`);
  
  console.log('\nFetching categories...');
  const categories = await getCategories();
  console.log(`Found ${categories.length} categories`);
  
  if (posts.length > 0) {
    console.log('\nFetching first post by slug...');
    const post = await getPostBySlug(posts[0].slug);
    console.log('Post:', post?.title);
  }
}

testWordPress();
```

Run with: `npx tsx test-wordpress.ts`

## Step 5: Test Build Process

### Test Static Generation

```bash
# Build the site
npm run build

# Check build output for blog pages
# Should see: /blog and /blog/[slug] routes
```

### Test Production Mode

```bash
# Start production server
npm start

# Test the blog pages work in production
```

## Common Issues and Solutions

### Issue: "No blog posts found"

**Solutions:**
1. Check WordPress has published posts
2. Verify `.env.local` has correct `WORDPRESS_API_URL`
3. Check WordPress REST API is accessible
4. Verify CORS is configured correctly

### Issue: Images not loading

**Solutions:**
1. Check `next.config.js` has WordPress domain in `remotePatterns`
2. Verify image URLs in WordPress are correct
3. Check featured images are set on posts

### Issue: CORS errors in browser console

**Solutions:**
1. Add CORS configuration to `wp-config.php` (see INSTALLATION.md)
2. Configure web server headers (Apache/Nginx)
3. Ensure WordPress REST API endpoint is accessible

### Issue: Build fails with API errors

**Solutions:**
1. Ensure WordPress is accessible during build
2. Add error handling in API calls
3. Consider using fallback data for development

## Performance Testing

### Test ISR (Incremental Static Regeneration)

1. Create a new post in WordPress
2. Wait 60 seconds (revalidation time)
3. Refresh the blog page
4. New post should appear

### Test Loading Times

Use browser DevTools to check:
- Time to First Byte (TTFB)
- Largest Contentful Paint (LCP)
- Total page load time

**Target metrics:**
- TTFB: < 600ms
- LCP: < 2.5s
- Total load: < 3s

## Security Testing

### Test API Security

1. Verify WordPress admin is not publicly accessible
2. Check that only public endpoints are exposed
3. Test that authentication is required for protected endpoints

### Test Content Security

1. Verify HTML content is properly sanitized
2. Check for XSS vulnerabilities in post content
3. Test image URLs are from trusted sources

## Accessibility Testing

1. Test keyboard navigation
2. Verify screen reader compatibility
3. Check color contrast ratios
4. Test responsive design on mobile devices

## Success Criteria

Your WordPress integration is successful when:

- ✅ Blog list page displays all published posts
- ✅ Individual post pages load correctly
- ✅ Category filtering works
- ✅ Images load from WordPress
- ✅ Post content formatting is preserved
- ✅ ISR updates content automatically
- ✅ Build process completes without errors
- ✅ SEO metadata is correct
- ✅ Performance metrics are within targets
- ✅ No console errors in browser

## Next Steps

After successful testing:

1. Create more blog posts in WordPress
2. Customize the blog design if needed
3. Set up WordPress backups
4. Configure production environment variables
5. Deploy to production
6. Monitor performance and errors

## Support

If you encounter issues:

1. Check WordPress and Next.js logs
2. Verify all configuration files
3. Test WordPress REST API directly
4. Review the INSTALLATION.md guide
5. Check Next.js documentation for ISR and dynamic routes

