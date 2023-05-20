package cz.utb.fai.howtodobiotech.api.content;

import cz.utb.fai.howtodobiotech.api.categories.ContentTypeController;
import cz.utb.fai.howtodobiotech.models.categories.ContentType;
import cz.utb.fai.howtodobiotech.services.categories.ContentTypeService;
import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static cz.utb.fai.howtodobiotech.utils.enums.EContentType.SKILL_OPPORTUNITY;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ContentTypeControllerTest {

    @Mock
    private ContentTypeService contentTypeService;

    @InjectMocks
    private ContentTypeController contentTypeController;

    @Test
    void selectContentByType_withExistingType_shouldReturnOk() {
        // given
        EContentType contentType = EContentType.ECOSYSTEM_NETWORK;
        ContentType content = new ContentType(1, SKILL_OPPORTUNITY);

        when(contentTypeService.findByType(contentType)).thenReturn(Optional.of(content));

        // when
        ResponseEntity<ContentType> response = contentTypeController.selectContentByType(contentType);

        // then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(content, response.getBody());
    }

    @Test
    void selectContentByType_withNonExistingType_shouldReturnNotFound() {
        // given
        EContentType contentType = EContentType.SKILL_OPPORTUNITY;

        when(contentTypeService.findByType(contentType)).thenReturn(Optional.empty());

        // when
        ResponseEntity<ContentType> response = contentTypeController.selectContentByType(contentType);

        // then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }
}
