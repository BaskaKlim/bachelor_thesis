package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.categories.ContentType;
import cz.utb.fai.howtodobiotech.repositories.categories.ContentTypeRepository;
import cz.utb.fai.howtodobiotech.services.categories.ContentTypeService;
import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContentTypeServiceTest {

    @Mock
    private ContentTypeRepository contentTypeRepository;

    @InjectMocks
    private ContentTypeService contentTypeService;

    private ContentType contentType1;
    private ContentType contentType2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        contentType1 = new ContentType();
        contentType1.setId(1);
        contentType1.setType(EContentType.SKILL_OPPORTUNITY);

        contentType2 = new ContentType();
        contentType2.setId(2);
        contentType2.setType(EContentType.ECOSYSTEM_NETWORK);
    }

    @Test
    void testGetContentTypeById_ExistingContentType() {
        int contentTypeId = 1;
        when(contentTypeRepository.findById(contentTypeId)).thenReturn(Optional.of(contentType1));
        Optional<ContentType> result = contentTypeService.getContentTypeById(contentTypeId);

        assertTrue(result.isPresent());
        assertEquals(contentType1, result.get());
        verify(contentTypeRepository, times(1)).findById(contentTypeId);
    }

    @Test
    void testGetContentTypeById_NonExistingContentType() {
        int contentTypeId = 3;
        when(contentTypeRepository.findById(contentTypeId)).thenReturn(Optional.empty());
        Optional<ContentType> result = contentTypeService.getContentTypeById(contentTypeId);

        assertFalse(result.isPresent());
        verify(contentTypeRepository, times(1)).findById(contentTypeId);
    }

    @Test
    void testGetAllContentTypes() {
        List<ContentType> contentTypes = Arrays.asList(contentType1, contentType2);
        when(contentTypeRepository.findAll()).thenReturn(contentTypes);
        List<ContentType> result = contentTypeService.getAllContentTypes();

        assertEquals(2, result.size());
        assertEquals(contentType1, result.get(0));
        assertEquals(contentType2, result.get(1));
        verify(contentTypeRepository, times(1)).findAll();
    }

    @Test
    void testAddContentType() {
        ContentType newContentType = new ContentType();
        newContentType.setType(EContentType.ECOSYSTEM_NETWORK);
        when(contentTypeRepository.save(newContentType)).thenReturn(newContentType);
        ContentType result = contentTypeService.addContentType(newContentType);

        assertNotNull(result);
        assertEquals(newContentType, result);
        verify(contentTypeRepository, times(1)).save(newContentType);
    }

    @Test
    void testUpdateContentType() {
        ContentType updatedContentType = new ContentType();
        updatedContentType.setId(1);
        updatedContentType.setType(EContentType.STARTUP_SUPPORT);
        when(contentTypeRepository.save(updatedContentType)).thenReturn(updatedContentType);
        ContentType result = contentTypeService.updateContentType(updatedContentType);

        assertNotNull(result);
        assertEquals(updatedContentType, result);
        verify(contentTypeRepository, times(1)).save(updatedContentType);
    }

    @Test
    void testDeleteContentTypeById() {
        // Arrange
        int contentTypeId = 1;

        // Act
        contentTypeService.deleteBiotechExpertById(contentTypeId);

        // Assert
        verify(contentTypeRepository, times(1)).deleteById(contentTypeId);
    }

    @Test
    void testFindByType_ExistingContentType() {
        EContentType contentType = EContentType.SKILL_OPPORTUNITY;
        when(contentTypeRepository.findByType(contentType)).thenReturn(Optional.of(contentType1));

        Optional<ContentType> result = contentTypeService.findByType(contentType);

        assertTrue(result.isPresent());
        assertEquals(contentType1, result.get());
        verify(contentTypeRepository, times(1)).findByType(contentType);
    }

    @Test
    void testFindByType_NonExistingContentType() {
        EContentType contentType = EContentType.ECOSYSTEM_NETWORK;

        when(contentTypeRepository.findByType(contentType)).thenReturn(Optional.empty());

        Optional<ContentType> result = contentTypeService.findByType(contentType);

        assertFalse(result.isPresent());
        verify(contentTypeRepository, times(1)).findByType(contentType);
    }
}
