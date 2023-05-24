package cz.utb.fai.howtodobiotech.services;

import cz.utb.fai.howtodobiotech.models.users.NewsletterLead;
import cz.utb.fai.howtodobiotech.repositories.users.NewsletterLeadRepository;
import cz.utb.fai.howtodobiotech.services.users.NewsletterLeadService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NewsletterLeadServiceTest {

    @Mock
    private NewsletterLeadRepository newsletterLeadRepository;

    @InjectMocks
    private NewsletterLeadService newsletterLeadService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNewsletterLeadById_ExistingLead() {
        int leadId = 1;
        NewsletterLead lead = new NewsletterLead();
        lead.setId(leadId);

        when(newsletterLeadRepository.findById(leadId)).thenReturn(Optional.of(lead));

        Optional<NewsletterLead> result = newsletterLeadService.getNewsletterLeadById(leadId);

        assertTrue(result.isPresent());
        assertEquals(lead, result.get());
        verify(newsletterLeadRepository, times(1)).findById(leadId);
    }

    @Test
    void testGetNewsletterLeadById_NonExistingLead() {
        int leadId = 1;

        when(newsletterLeadRepository.findById(leadId)).thenReturn(Optional.empty());
        Optional<NewsletterLead> result = newsletterLeadService.getNewsletterLeadById(leadId);

        assertFalse(result.isPresent());
        verify(newsletterLeadRepository, times(1)).findById(leadId);
    }

    @Test
    void testAddNewsletterLead() {
        NewsletterLead lead = new NewsletterLead();
        when(newsletterLeadRepository.save(lead)).thenReturn(lead);
        NewsletterLead result = newsletterLeadService.addNewsletterLead(lead);

        assertEquals(lead, result);
        verify(newsletterLeadRepository, times(1)).save(lead);
    }

    @Test
    void testDeleteNewsletterLeadById() {
        int leadId = 1;

        newsletterLeadService.deleteNewsletterLeadById(leadId);
        verify(newsletterLeadRepository, times(1)).deleteById(leadId);
    }

    @Test
    void testUpdateNewsletterLead() {
        NewsletterLead lead = new NewsletterLead();
        when(newsletterLeadRepository.save(lead)).thenReturn(lead);

        NewsletterLead result = newsletterLeadService.updateNewsletterLead(lead);
        assertEquals(lead, result);
        verify(newsletterLeadRepository, times(1)).save(lead);
    }

    @Test
    void testGetAllNewsletterLeads() {
        List<NewsletterLead> leads = new ArrayList<>();
        NewsletterLead lead1 = new NewsletterLead();
        NewsletterLead lead2 = new NewsletterLead();
        leads.add(lead1);
        leads.add(lead2);

        when(newsletterLeadRepository.findAll()).thenReturn(leads);
        List<NewsletterLead> result = newsletterLeadService.getAllNewsletterLeads();

        assertEquals(leads.size(), result.size());
        assertTrue(result.contains(lead1));
        assertTrue(result.contains(lead2));
        verify(newsletterLeadRepository, times(1)).findAll();
    }
}
