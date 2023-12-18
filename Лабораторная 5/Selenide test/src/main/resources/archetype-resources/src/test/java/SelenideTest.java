import junit.framework.Test;


import static com.codeborne.selenide.Selenide.open;

public class SelenideTest {
    @Test
    public void testGoogle(){
        open("https://www.google.ru/?hl=ru");
    }
}