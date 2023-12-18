package org.example;
import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Configuration;
import static com.codeborne.selenide.Selenide.*;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;


/**
 * Unit test for simple App.
 */
public class AppTest
{
    @BeforeAll
    static void setUp() {
        // Настройка Selenide перед запуском тестов
        Configuration.browserSize = "1920x1200";
        // Включение задержки закрытия браузера
        Configuration.holdBrowserOpen = true;
    }
    @Test
    public void ShopsButton() {
        open("https://sezoncentr.ru/");

        // Use a different selector that points to a visible element
        $x("//a[@href='#shops']").click();
        $x("//div[@id='shops']").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void ArticlesAndNewsButton()
    {
        open("https://sezoncentr.ru/");
        $x("//a[@href='/?fc=module&module=csblog&controller=categoryPost']").click();
        $x("//*[@id='center_column']/h1").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void DeliveryAndPaymentButton()
    {
        open("https://sezoncentr.ru/");
        $x("//a[@href='/content/1-delivery']").click();
        $x("//*[@id='columns']/div[1]/div/div/span[2]").shouldBe(Condition.visible);

        sleep(3000);

    }
    @Test
    public void ContactsButton()
    {
        open("https://sezoncentr.ru/");
        $x("//a[@href='/content/8-kontakty']").click();
        $x("//*[@id='center_column']/div[1]/h2[1]").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void CatalogButton()
    {

        open("https://sezoncentr.ru/");
        $x("//*[@id='bcategories']/button").click();
        $x("//*[@id='bcategories']/div").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void PopularButton()
    {
        open("https://sezoncentr.ru/");
        $x("//a[@href='#homefeatured']").scrollTo().click();
        $x("//*[@id='homefeatured']").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void NewProducts()
    {
        open("https://sezoncentr.ru/");
        $x("//a[@href='https://sezoncentr.ru/new-products']").scrollTo().click();
        $x("//*[@id='center_column']/h1").shouldBe(Condition.visible);

       sleep(3000);
    }
    @Test
    public void Policy()
    {
        open("https://sezoncentr.ru/");
        $x("//a[@href='https://sezoncentr.ru/content/9-policy']").scrollTo().click();
        $x("//*[@id='inputResult']/div[1]/div/h4/strong").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void Search()
    {
        open("https://sezoncentr.ru/");
        $x("//input[@name='search_query']").setValue("Самовар").pressEnter();
        $x("//*[@id='center_column']/ul/li[1]/div").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void WatchProductCard()
    {
        open("https://sezoncentr.ru/search?controller=search&orderby=position&orderway=desc&search_query=Самовар&submit_search=");
        $x("//*[@id='center_column']/ul/li[1]/div/div[1]/div/a/img").scrollTo().click();
        $x("//*[@id='center_column']/div[1]/div/div[3]/h1").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void ZoomIn()
    {
        open("https://sezoncentr.ru/samovary-i-aksessuary-k-nim-/2448-elektricheskij-samovar-iz-latuni-na-3-litra-forma-ryumka-s-zasshitoj-ot-vykipaniya-.html?search_query=%D0%A1%D0%B0%D0%BC%D0%BE%D0%B2%D0%B0%D1%80&results=13");
        $x("//*[@id='view_full_size']/span").click();
        $x("//*[@id='product']/div[4]").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void AddInCart()
    {
        open("https://sezoncentr.ru/samovary-i-aksessuary-k-nim-/2448-elektricheskij-samovar-iz-latuni-na-3-litra-forma-ryumka-s-zasshitoj-ot-vykipaniya-.html?search_query=%D0%A1%D0%B0%D0%BC%D0%BE%D0%B2%D0%B0%D1%80&results=13");
        $x("//*[@id='add_to_cart']/button/span").click();
        $x("//*[@id='header']/div[2]/div/div[1]/div[3]/div/div/a").hover();
        $x("//*[@id='header']/div[2]/div/div[1]/div[3]/div/div/div/div/div/dl/dt").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void MakeOrder()
    {
        open("https://sezoncentr.ru/samovary-i-aksessuary-k-nim-/2448-elektricheskij-samovar-iz-latuni-na-3-litra-forma-ryumka-s-zasshitoj-ot-vykipaniya-.html?search_query=%D0%A1%D0%B0%D0%BC%D0%BE%D0%B2%D0%B0%D1%80&results=13");
        $x("//*[@id='add_to_cart']/button/span").click();
        $x("//*[@id='header']/div[2]/div/div[1]/div[3]/div/div/a").hover();
        $x("//*[@id='button_order_cart']/span").click();
        $x("//*[@id='order-detail-content']").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void MakeOrder2()
    {
        open("https://sezoncentr.ru/samovary-i-aksessuary-k-nim-/2448-elektricheskij-samovar-iz-latuni-na-3-litra-forma-ryumka-s-zasshitoj-ot-vykipaniya-.html?search_query=%D0%A1%D0%B0%D0%BC%D0%BE%D0%B2%D0%B0%D1%80&results=13");
        $x("//*[@id='add_to_cart']/button/span").click();
        $x("//*[@id='header']/div[2]/div/div[1]/div[3]/div/div/a").click();
        $x("//*[@id='order-detail-content']").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void ConfirmOrder()
    {
        open("https://sezoncentr.ru/samovary-i-aksessuary-k-nim-/2448-elektricheskij-samovar-iz-latuni-na-3-litra-forma-ryumka-s-zasshitoj-ot-vykipaniya-.html?search_query=%D0%A1%D0%B0%D0%BC%D0%BE%D0%B2%D0%B0%D1%80&results=13");
        $x("//*[@id='add_to_cart']/button/span").click();
        $x("//*[@id='header']/div[2]/div/div[1]/div[3]/div/div/a").click();
        $x("//*[@id='customer_firstname']").setValue("Иван");
        $x("//*[@id='customer_lastname']").setValue("Иванов");
        $x("//*[@id='customer_email']").setValue("biba123@yandex.ru");
        $x("//*[@id='delivery_phone_mobile']").setValue("+7(823)120-99-54");
        $x("//*[@id='btn_place_order']").click();
        $x("//*[@id='center_column']/h1").shouldBe(Condition.visible);
        sleep(3000);
    }
    @Test
    public void NetView()
    {
        open("https://sezoncentr.ru/search?controller=search&orderby=position&orderway=desc&search_query=Самовар&submit_search=");
        $x("//*[@id='list']/a").click();
        $x("//*[@id='center_column']/ul/li[1]/div/div").scrollTo().shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void CatalogSmoke()
    {
        open("https://sezoncentr.ru/");
        $x("//*[@id='bcategories']/button").click();
        $x("//*[@id='bcategories']/div/ul/li[2]/span").click();
        $x("//*[@id='bcategories']/div/ul/li[2]/ul/li[1]/a").click();
        $x("//*[@id='center_column']/ul/li[1]/div").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void TryPlus()
    {
        open("https://sezoncentr.ru/81-dymogenerator");
        $x("//*[@id='categories_block_left']/div/ul/li/ul/li[1]/span").click();
        $x("//*[@id='categories_block_left']/div/ul/li/ul/li[1]/ul/li[1]/a").shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void Sort()
    {
        open("https://sezoncentr.ru/81-dymogenerator");
        $x("//*[@id='selectProductSort']").click();
        $x("//*[@id='selectProductSort']/option[3]").click();
        $x("//*[@id='center_column']/ul/li[1]/div").scrollTo().shouldBe(Condition.visible);

        sleep(3000);
    }
    @Test
    public void NewProductsTab()
    {
        open("https://sezoncentr.ru/81-dymogenerator");
        $x("//*[@id='new-products_block_right']/div/ul/li[1]/div/h5/a").scrollTo().click();
        $x("//*[@id='center_column']/div[1]/div").shouldBe(Condition.visible);

        sleep(3000);
    }
    @AfterEach
    void tearDown() {
        // Закрытие браузера после выполнения каждого теста
        //Configuration.holdBrowserOpen = false;
    }

}
